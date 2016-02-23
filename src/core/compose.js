import pipe from './pipe'
import rawCurry from '../internal/raw-curry'
import reverse from '../delegate/reverse'

// [(d -> e), ..., (b -> c), (a -> b)] -> a -> e
const compose = rawCurry(2,
	(funcs, arg) => pipe(reverse(funcs), arg)
)

export default compose
