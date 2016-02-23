import pipe from './pipe'
import curry from './curry'
import reverse from './reverse'

// [(d -> e), ..., (b -> c), (a -> b)] -> a -> e
const compose = curry(2,
	(funcs, arg) => pipe(reverse(funcs), arg)
)

export default compose
