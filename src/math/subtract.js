import rawCurry from '../internal/raw-curry'

// Subtractable a => a -> a -> a
export const subtract = rawCurry(2, 
	(b, a) => a - b
)

export default subtract
