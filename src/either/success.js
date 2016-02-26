const Success = value => ({
	chain: f => f(value),
	chainBoth: (f, g) => g(value),
	chainLeft: () => Success(value),
	fork: (whenFailure, whenSuccess) => whenSuccess(value),
	map: f => Success(f(value)),
	mapBoth: (f, g) => Success(g(value)),
	mapLeft: () => Success(value)
})

export default Success
