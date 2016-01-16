import rawCurry from '../internal/raw-curry'

// (a -> b) -> Delayed a -> b
const resolve = rawCurry(2, 
	(f, d) => d.resolve(f)
)

export default resolve
