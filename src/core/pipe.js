import rawCurry from '../internal/raw-curry'

// [(a -> b), (b -> c), ..., (d -> e)] -> a -> e
const pipe = rawCurry(2,
	(funcs, arg) => funcs.reduce((arg, func) => func(arg), arg)
)

export default pipe
