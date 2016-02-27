import fs from 'fs'
import Promise from 'bluebird'
import sortObject from 'sort-object-circular'

Promise.promisifyAll(fs)

const ERROR_ON_CHANGES = process.argv.indexOf('--error-on-changes') !== -1

function sortJson(string) {
	return JSON.stringify(sortObject(JSON.parse(string)), null, 2) + '\n'
}

function sortLines(string) {
	return string
	.split('\n')
	.sort()
	.join('\n')
	.trim('\n') + '\n'
}

function createFileTransformer(transformation) {
	return function(path) {
		return fs.readFileAsync(path)
		.then(buffer => {
			console.log(`Read "${path}".`) // eslint-disable-line no-console
			const input = buffer.toString()
			const output = transformation(input)
			if (input === output) return false
			return fs.writeFileAsync(path, output).then(() => {
				console.log(`Wrote "${path}".`) // eslint-disable-line no-console
				return true
			})
		})
	}
}

Promise.all([
	...[
		'.babelrc',
		'.eslintrc.json',
		'package.json'
	].map(createFileTransformer(sortJson)),
	...[
		'.gitignore',
		'.npmignore'
	].map(createFileTransformer(sortLines))
])
.then(changes => {
	console.log(`Sorted configuration files.`)  // eslint-disable-line no-console
	if (ERROR_ON_CHANGES && changes.reduce((l, r) => l || r)) {
		process.exitCode = 1
	}
}, error => {
	console.error(error)  // eslint-disable-line no-console
})
