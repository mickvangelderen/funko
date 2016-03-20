import Future from './'

const futureWrapCatchable = func =>
	(...args) =>
		Future((reject, resolve) => {
			let result
			try {
				result = func(...args)
			} catch (error) {
				return reject(error)
			}
			// Resolve outside of the try-catch block to
			// prevent nasty side effects!
			resolve(result)
		})

export default futureWrapCatchable
