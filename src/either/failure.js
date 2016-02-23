const Failure = value => ({
	chain: () => Failure(value),
	chainFailure: f => f(value),
	fork: whenFailure => whenFailure(value),
	map: () => Failure(value),
	mapFailure: f => Failure(f(value))
})

export default Failure
