const Failure = value => ({
	chain: () => Failure(value),
	chainBoth: f => f(value),
	chainLeft: f => f(value),
	fork: whenFailure => whenFailure(value),
	map: () => Failure(value),
	mapBoth: f => Failure(f(value)),
	mapLeft: f => Failure(f(value))
})

export default Failure
