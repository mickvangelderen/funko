function Spy(func) {
	const spy = function(...args) {
		spy.calls.push(args)
		return typeof func === 'function' ? func(...args) : func
	}
	spy.calls = []
	return spy
}

export default Spy
