import curry from './curry'

// Chainable a => (a -> b) -> a -> b
const chainLeft = curry(2,
	(f, a) => a.chainLeft(f)
)

export default chainLeft
