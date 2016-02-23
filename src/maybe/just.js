const Just = value => ({
	chain: f => f(value),
	chainNothing: () => Just(value),
	map: f => Just(f(value)),
	mapNothing: () => Just(value),
	otherwise: () => value
})

export default Just
