import curry from './curry'

// Comparable a => a -> a -> Bool
const atLeast = curry(2,
	(b, a) => a >= b
)

export default atLeast