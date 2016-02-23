import curry from './curry'

// Comparable a => a -> a -> Bool
const lessThan = curry(2,
	(b, a) => a < b
)

export default lessThan
