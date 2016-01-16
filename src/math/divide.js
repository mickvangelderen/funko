import rawCurry from '../internal/raw-curry'

// Multipliable a => a -> a -> a
export const divide = rawCurry(2, 
	(b, a) => a / b
)

export default divide