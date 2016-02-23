const Just = value => ({
	map: f => Just(f(value)),
	chain: f => f(value),
	otherwise: () => value
})

export default Just
