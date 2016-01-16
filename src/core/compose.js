import rawCurry from '../internal/raw-curry'
import pipe from './pipe'
import reverse from '../delegate/reverse'

// [(d -> e), ..., (b -> c), (a -> b)] -> a -> e
export const compose = rawCurry(2,
	(funcs, arg) => pipe(reverse(funcs), arg)
)

export default compose
