import rawCurry from '../internal/raw-curry'

// Comparable a => a -> a -> a
export const max = rawCurry(2, 
	(a, b) => Math.max(a, b)
)

export default max
