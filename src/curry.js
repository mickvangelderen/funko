// Exported for tests.
export const _partial = (argu, func) =>
	argu.length === 0 ?
		func :
		(...ments) => func(...argu, ...ments)

// Exported for tests.
export const _curry = (arity, func) =>
	(...args) => args.length >= arity ?
		func(...args) :
		_curry(arity - args.length, _partial(args, func))

const curry = _curry(2, _curry)

export default curry
