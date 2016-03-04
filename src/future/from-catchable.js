import Future from './'

const futureFromCatchable = func =>
	Future((reject, resolve) => {
		try {
			return resolve(func())
		} catch (error) {
			return reject(error)
		}
	})

export default futureFromCatchable
