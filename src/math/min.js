import rawCurry from '../internal/raw-curry'

// Comparable a => a -> a -> a
export const min = rawCurry(2, 
	(a, b) => Math.min(a, b)
)

export default min