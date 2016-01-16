import rawCurry from '../internal/raw-curry'

// Comparable a => a -> a -> Bool
export const moreThan = rawCurry(2,
	(b, a) => a > b
)

export default moreThan
