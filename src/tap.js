import curry from './curry'

// (a -> *) -> a -> a
const tap = curry(2,
	(func, value) => {
		func(value)
		return value
	}
)

export default tap
