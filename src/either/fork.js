import curry from '../curry'

// (a -> b) -> (c -> d) -> Either a c -> b | d
const eitherFork = curry(3,
	(whenFailure, whenSuccess, either) => either.fork(whenFailure, whenSuccess)
)

export default eitherFork
