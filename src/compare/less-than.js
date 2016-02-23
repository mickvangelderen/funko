import rawCurry from '../internal/raw-curry'

// Comparable a => a -> a -> Bool
const lessThan = rawCurry(2,
	(b, a) => a < b
)

export default lessThan
