import curry from './curry'

// Mappable a => (a -> b) -> a -> b
const map = curry(2,
	(f, a) => a.map(f)
)

export default map
