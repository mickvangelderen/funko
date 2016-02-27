import curry from './curry'

// (a -> Bool) -> Filterable a -> Filterable a
const filter = curry(2, 
	(predicate, filterable) => filterable.filter(predicate)
)

export default filter
