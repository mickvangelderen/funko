import Future from './'

const futureWrapCatchable = func =>
	(...args) =>
		Future((reject, resolve) => {
			try {
				return resolve(func(...args))
			} catch (error) {
				return reject(error)
			}
		})

export default futureWrapCatchable
