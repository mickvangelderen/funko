function expectNumber(value) {
	if (typeof value === 'number' && value === value) return value
	throw new TypeError('Expected a number.')
}

const arraySlice = Array.prototype.slice

function add3(first, _second, _third) {
	if (arguments.length > 3) throw new Error('Too many arguments.')
	if (arguments.length === 0) throw new Error('Expected at least 1 argument.')
	expectNumber(first)
	let sum = first
	if (arguments.length === 1) return add3$
	return add3$.apply(null, arraySlice.call(arguments, 1))
	function add3$(second, _third) {
		if (arguments.length > 2) throw new Error('Too many arguments.')
		if (arguments.length === 0) throw new Error('Expected at least 1 argument.')
		expectNumber(second)
		sum = sum + second
		if (arguments.length === 1) return add3$$
		return add3$$.apply(null, arraySlice.call(arguments, 1))
		function add3$$(third) {
			if (arguments.length > 1) throw new Error('Too many arguments.')
			if (arguments.length === 0) throw new Error('Expected at least 1 argument.')
			expectNumber(third)
			return sum + third
		}
	}
}

console.log(add3(1, 2, 3))
console.log(add3(1)(2)(3))
