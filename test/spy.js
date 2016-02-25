function Spy(func) {
	const spy = function(...args) {
		spy.calls.push(args)
		return func(...args)
	}
	spy.calls = []
	return spy
}

export default Spy
