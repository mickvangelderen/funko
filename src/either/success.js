const Success = value => ({
	map: f => Success(f(value)),
	chain: f => f(value),
	fork: (whenFailure, whenSuccess) => whenSuccess(value)
})

export default Success
