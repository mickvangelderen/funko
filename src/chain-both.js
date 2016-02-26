import curry from './curry'

// (a -> a') -> (b -> b') -> Chainable a b -> Chainable a b' | Chainable a' b
const chainBoth = curry(3,
	(leftFunc, rightFunc, a) => a.chainBoth(leftFunc, rightFunc)
)

export default chainBoth
