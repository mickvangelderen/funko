import curry from './curry'

// Comparable a => a -> a -> Bool
const atMost = curry(2, 
	(b, a) => a <= b
)

export default atMost