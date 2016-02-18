import fs from 'fs'
import Promise from 'bluebird'

Promise.promisifyAll(fs)

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

function sortJson(buffer) {
	return JSON.stringify(sortObjectKeys(JSON.parse(buffer)), null, 2)
}

function sortLines(buffer) {
	return buffer.toString()
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
			return fs.writeFileAsync(path, transformation(buffer))
		})
		.then(() => {
			console.log(`Wrote "${path}".`) // eslint-disable-line no-console
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
.then(() => {
	console.log(`Sorted configuration files.`)  // eslint-disable-line no-console
}, error => {
	console.error(error)  // eslint-disable-line no-console
})
