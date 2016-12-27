function expectNumber(value) {
	if (typeof value === 'number' && value === value) return value
	throw new TypeError('Expected a number.')
}

const arraySlice = Array.prototype.slice

/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "^_" }]*/
function add3(first, _second, _third) {
	expectPassedArguments(add3, arguments)
	expectNumber(first)
	return chilli(add3$, arguments)
	function add3$(second, _third) {
		expectPassedArguments(add3$, arguments)
		expectNumber(second)
		return chilli( add3$$, arguments)
		function add3$$(third) {
			expectPassedArguments(add3$$, arguments)
			expectNumber(third)
			return first + second + third
		}
	}
}

// function add3(first, second, third) {
// 	expectNumber(first)
// 	expectNumber(second)
// 	expectNumber(third)
// 	return first + second + third
// }

// const add3 = 
// 	first => (expectNumber(first), 
// 	second => (expectNumber(second),
// 	third => (expectNumber(third), first + second + third
// )))

function expectPassedArguments(func, args) {
	if (args.length < 1)
		throw new RangeError(`Expected at least 1 argument but got ${args.length}.`)
	if (args.length > func.length)
		throw new RangeError(`Expected at most ${func.length} arguments but got ${args.length}.`)
}

function chilli(next, args) {
	const length = args.length
	return length === 1
		? next
		: next.apply(null, arraySlice.call(args, 1))
}

/*eslint no-console: 0 */
console.log(add3(1, 2, 3))
console.log(add3(1)(2)(3))
