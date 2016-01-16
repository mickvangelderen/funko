import rawCurry from '../internal/raw-curry'

// Reducable r => (a -> b -> a) -> a -> r -> b
const reduce = rawCurry(3, 
	(f, a, r) => r.reduce(f, a)
)

export default reduce
