import curry from './curry'

// (a -> a') -> (b -> b') -> Thing a b -> Thing a b' | Thing a' b
const mapBoth = curry(3,
	(leftFunc, rightFunc, a) => a.mapBoth(leftFunc, rightFunc)
)

export default mapBoth
