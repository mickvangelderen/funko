const Just = value => ({
	chain: f => f(value),
	chainBoth: (f, g) => g(value),
	chainLeft: () => Just(value),
	map: f => Just(f(value)),
	otherwise: () => value
})

export default Just
