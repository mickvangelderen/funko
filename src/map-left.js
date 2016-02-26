import curry from './curry'

// (a -> a') -> Thing a b -> Thing a' b
const mapLeft = curry(2,
	(f, a) => a.mapLeft(f)
)

export default mapLeft
