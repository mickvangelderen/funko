import curry from './curry'

// (a -> b) -> Delayed a -> b
const delayedResolve = curry(2,
	(resolve, delayed) => delayed.resolve(resolve)
)

export default delayedResolve
