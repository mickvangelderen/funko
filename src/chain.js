import curry from './curry'

// Chainable a => (a -> b) -> a -> b
const chain = curry(2,
	(f, a) => a.chain(f)
)

export default chain
