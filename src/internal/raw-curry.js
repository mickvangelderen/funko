import rawPartial from './raw-partial'

export const rawCurry = (arity, func) =>
	(...args) => args.length >= arity ?
		func(...args) :
		rawCurry(arity - args.length, rawPartial(args, func))

export default rawCurry
