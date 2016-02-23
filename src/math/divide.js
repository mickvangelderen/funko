import rawCurry from '../internal/raw-curry'

// Number a => a -> a -> a
const divide = rawCurry(2, 
	(b, a) => a / b
)

export default divide