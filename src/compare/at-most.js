import rawCurry from '../internal/raw-curry'

// Comparable a => a -> a -> Bool
export const atMost = rawCurry(2, 
	(b, a) => a <= b
)

export default atMost