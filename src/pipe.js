import curry from './curry'

// [(a -> b), (b -> c), ..., (d -> e)] -> a -> e
const pipe = curry(2,
	(funcs, arg) => funcs.reduce((arg, func) => func(arg), arg)
)

export default pipe
