function expectNumber(value) {
	if (typeof value === 'number' && value === value) return value
	throw new TypeError('Expected a number.')
}

// function expectArray(value) {
// 	if (Array.isArray(value)) return value
// 	throw new TypeError('Expected an Array.')
// }

// function expectFunction(value) {
// 	if (typeof value === 'function') return value
// 	throw new TypeError('Expected a function.')
// }

// function expectEqual(expected, actual) {
// 	if (actual === expected) return actual
// 	throw new RangeError(`Expected ${expected} to strictly equal ${actual}.`)
// }

// function expectAtLeast(expected, actual) {
// 	if (actual >= expected) return actual
// 	throw new RangeError(`Expected at least ${expected} but got ${actual}.`)
// }

// function expectFunctionOfArity(arity, value) {
// 	expectFunction(value)
// 	expectEqual(arity, value.length)
// 	return value
// }

/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "^_" }]*/
function add3(first, second, third) {
	if (arguments.length > 3) {
		throw new Error('Too many arguments.')
	}

	if (arguments.length === 0) {
		throw new Error('Expected at least 1 argument.')
	}
	let result = add3$(first)

	if (arguments.length === 1) {
		return (function(result) {
			return function(second, third) {
				if (arguments.length > 2) {
					throw new Error('Too many arguments.')
				}

				if (arguments.length === 0) {
					throw new Error('Expected at least 1 argument.')
				}
				result = add3$$(result, second)

				if (arguments.length === 1) {
					return (function(result) {
						return function(third) {
							if (arguments.length > 1) {
								throw new Error('Too many arguments.')
							}
							
							if (arguments.length === 0) {
								throw new Error('Expected at least 1 argument.')
							}
							return add3$$$(result, third)
						}
					})
				}
				return add3$$$(result, third)
			}
		})(result)
	}
	result = add3$$(result, second)

	if (arguments.length === 2) {
		return (function(result) {
			return function(third) {
				if (arguments.length === 0) {
					throw new Error('Expected at least 1 argument.')
				}
				if (arguments.length > 1) {
					throw new Error('Too many arguments.')
				}
				return add3$$$(result, third)
			}
		})
	}
	return add3$$$(result, third)
}

function add3$(first) {
	expectNumber(first)
	return first
}

function add3$$(sum, second) {
	expectNumber(second)
	return sum + second
}

function add3$$$(sum, third) {
	expectNumber(third)
	return sum + third
}

/*eslint no-console: 0 */
console.log(add3(1, 2, 3))
console.log(add3(1)(2)(3))
