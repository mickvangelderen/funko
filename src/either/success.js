const Success = value => ({
	chain: f => f(value),
	chainFailure: () => Success(value),
	fork: (whenFailure, whenSuccess) => whenSuccess(value),
	map: f => Success(f(value)),
	mapFailure: () => Success(value)
})

export default Success
