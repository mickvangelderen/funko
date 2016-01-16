import rawCurry from '../internal/raw-curry'

// Addable a => a -> a -> a
export const add = rawCurry(2,
	(a, b) => a + b
)

export default add
