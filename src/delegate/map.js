import rawCurry from '../internal/raw-curry'

// Mappable a => (a -> b) -> a -> b
export const map = rawCurry(2,
	(f, a) => a.map(f)
)

export default map
