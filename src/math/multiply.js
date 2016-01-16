import rawCurry from '../internal/raw-curry'

// Multipliable a => a -> a -> a
export const multiply = rawCurry(2, 
	(a, b) => a * b
)

export default multiply
