import all from '../src/future/all'
import glob from './util/glob'
import log from './util/log'
import map from '../src/map'
import pipe from '../src/pipe'
import readFile from 'funko-fs/lib/read-file'
import rejected from '../src/future/rejected'
import resolved from '../src/future/resolved'
import sortObject from 'sort-object-circular'
import writeFile from 'funko-fs/lib/write-file'
import { EOL } from 'os'

const ERROR_ON_CHANGES = process.argv.indexOf('--error-on-changes') !== -1

const logErrorOrInfo = ERROR_ON_CHANGES ? log.error : log.info

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
			const input = buffer.toString()
			let output = null
			try {
				output = transformation(input)
			} catch (error) {
				return rejected({
					message: `Failed to transform ${path}.`,
					original: error
				})
			}
			if (input === output) {
				log.info(`No need to update ${path}.`)
				return resolved(null)
			} else {
				return writeFile('utf-8', path, output)
				.chain(() => {
					logErrorOrInfo(`Updated ${path}.`)
					return resolved(path)
				})
			}
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
	error => {
		process.exitCode = 1
		log.error(error)
	},
	([ json, lines ]) => {
		const changed = json.concat(lines).filter(path => path !== null)
		if (changed.length > 0) {
			if (ERROR_ON_CHANGES) process.exitCode = 1
			logErrorOrInfo(`Sorted configuration files, updated ${changed.length} file${changed.length > 1 ? 's': ''}.`)
		} else {
			log.info('Sorted configuration files, no changes.')
		}
	}
)
