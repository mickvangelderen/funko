import fs from 'fs'
import Promise from 'bluebird'

Promise.promisifyAll(fs)

const ERROR_ON_CHANGES = process.argv.indexOf('--error-on-changes') !== -1

const isArray = Array.isArray

const isObject = value => Object.prototype.toString.call(value) === '[object Object]'

function sortObjectKeys(input, inputs = [], outputs = []) {
	// Immediately return values that do not have properties. 
	if (!isArray(input) && !isObject(input)) return input

	// Check if result already computed.
	const index = inputs.indexOf(input)
	if (index !== -1) return outputs[index]

	// Create an output reference.
	const output = isArray(input) ? [] :
		Object.create(Object.getPrototypeOf(input))

	// Store the input and output so they are used while recursively sorting nested objects. 
	inputs.push(input)
	outputs.push(output)

	// Copy keys from input to output in a sorted manner. 
	Object.keys(input).sort().forEach(key => {
		output[key] = sortObjectKeys(input[key], inputs, outputs)
	})

	return output
}

function sortJson(string) {
	return JSON.stringify(sortObjectKeys(JSON.parse(string)), null, 2) + '\n'
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
