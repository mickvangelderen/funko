import Future from './'

const futureFromCatchable = func =>
	Future((reject, resolve) => {
		let result
		try {
			result = func()
		} catch (error) {
			return reject(error)
		}
		// Resolve outside of the try-catch block to
		// prevent nasty side effects!
		resolve(result)
	})

export default futureFromCatchable
