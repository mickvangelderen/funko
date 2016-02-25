import fromCallback from './from-callback'

const futureWrapFunction = func =>
	(...args) => fromCallback(callback => func(...args, callback))

export default futureWrapFunction
