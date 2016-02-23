import curry from './curry'

// Reducable r => (a -> b -> a) -> a -> r -> b
const reduce = curry(3, 
	(f, a, r) => r.reduce(f, a)
)

export default reduce
