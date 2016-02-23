import rawCurry from '../internal/raw-curry'

// Number a => a -> a -> a
const multiply = rawCurry(2, 
	(a, b) => a * b
)

export default multiply
