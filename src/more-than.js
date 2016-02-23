import curry from './curry'

// Comparable a => a -> a -> Bool
const moreThan = curry(2,
	(b, a) => a > b
)

export default moreThan
