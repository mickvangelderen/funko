import rawCurry from '../internal/raw-curry'

// Number a => a -> a -> a
const add = rawCurry(2,
	(a, b) => a + b
)

export default add
