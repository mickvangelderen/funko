import all from 'funko/lib/future/all'
import glob from './util/glob'
import map from 'funko/lib/map'
import pipe from 'funko/lib/pipe'
import readFile from 'funko-fs/lib/read-file'
import resolved from 'funko/lib/future/resolved'
import sortObject from 'sort-object-circular'
import writeFile from 'funko-fs/lib/write-file'
import { EOL } from 'os'

const ERROR_ON_CHANGES = process.argv.indexOf('--error-on-changes') !== -1

function sortJson(string) {
	return JSON.stringify(sortObject(JSON.parse(string)), null, 2)
	.replace('\n', EOL) + EOL
}

function sortLines(string) {
	return string
	.split(EOL)
	.sort()
	.join(EOL)
	.trim(EOL) + EOL
}

function createFileTransformer(transformation) {
	return function(path) {
		return readFile('utf-8', path)
		.chain(buffer => {
			console.log(`Read "${path}".`) // eslint-disable-line no-console
			const input = buffer.toString()
			const output = transformation(input)
			if (input === output) return resolved(null)
			return writeFile('utf-8', path, output)
			.chain(() => {
				console.log(`Wrote "${path}".`) // eslint-disable-line no-console
				return resolved(path)
			})
		})
	}
}

function transformFiles(pattern, transformer) {
	return glob({ dot: true }, pattern)
	.chain(pipe([
		map(createFileTransformer(transformer)),
		all
	]))
}

all([
	transformFiles('{,{src,test,tools}/**/}{.babelrc,*.json}', sortJson),
	transformFiles('{,{src,test,tools}/**/}{.gitignore,.npmignore}', sortLines)
]).fork(
	console.error, // eslint-disable-line no-console
	([ json, lines ]) => {
		const changed = json.concat(lines).filter(path => path !== null)
		if (changed.length > 0) {
			console.log(`Sorted configuration files, updated ${changed.length} file${changed.length > 1 ? 's': ''}.`) // eslint-disable-line no-console
			if (ERROR_ON_CHANGES) process.exitCode = 1
		} else {
			console.log('Sorted configuration files, no changes.') // eslint-disable-line no-console
		}
	}
)
