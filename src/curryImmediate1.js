function expectNumber(value) {
	if (typeof value === 'number' && value === value) return value
	throw new TypeError('Expected a number.')
}

function add3(a, b, c) {
	expectNumber(a)
	switch (arguments.length) {
		case 0: throw new Error('Expected at least 1 argument.')
		case 1: return add3_
		case 2: return add3_(b)
		case 3: return add3_(b, c)
		default: throw new Error('Too many arguments.')
	}
	function add3_(b, c) {
		expectNumber(b)
		switch (arguments.length) {
			case 0: throw new Error('Expected at least 1 argument.')
			case 1: return add3__
			case 2: return add3__(c)
			default: throw new Error('Too many arguments.')
		}
		function add3__(c) {
			switch (arguments.length) {
				case 0: throw new Error('Expected at least 1 argument.')
				case 1: return a + b + c
				default: throw new Error('Too many arguments.')
			}
		}
	}
}
