import rawCurry from '../internal/raw-curry'

// a -> Maybe b -> a | b
export const otherwise = rawCurry(2, 
	(a, m) => m.otherwise(a)
)

export default otherwise
