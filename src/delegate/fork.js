import rawCurry from '../internal/raw-curry'

// (a -> c) -> (b -> d) -> Either a | b -> c | d
export const fork = rawCurry(3, 
	(f, g, e) => e.fork(f, g)
)

export default fork
