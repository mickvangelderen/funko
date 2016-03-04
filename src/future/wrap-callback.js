import fromCallback from './from-callback'

const futureWrapCallback = func =>
	(...args) => fromCallback(callback => func(...args, callback))

export default futureWrapCallback
