import curry from '../curry'

// a -> Maybe b -> a | b
const otherwise = curry(2,
	(value, maybe) => maybe.otherwise(value)
)

export default otherwise
