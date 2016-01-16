export const Failure = value => ({
	map: () => Failure(value),
	chain: () => Failure(value),
	fork: whenFailure => whenFailure(value)
})

export default Failure
