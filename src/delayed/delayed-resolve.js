import rawCurry from '../internal/raw-curry'

// (a -> b) -> Delayed a -> b
const delayedResolve = rawCurry(2,
	(resolve, delayed) => delayed.resolve(resolve)
)

export default delayedResolve
