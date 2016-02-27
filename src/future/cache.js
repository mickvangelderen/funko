import Future from './'

const UNFORKED = { status: 'unforked' }
const FORKING = { status: 'forking' }
const REJECTED = { status: 'rejected' }
const RESOLVED = { status: 'resolved' }

const cache = future => {
	let rejecters = []
	let resolvers = []
	let status = UNFORKED
	let _value = null
	return Future((reject, resolve) => {
		switch(status) {
			case UNFORKED:
				status = FORKING
				future.fork(
					error => {
						if (status !== FORKING) return
						status = REJECTED
						_value = error
						reject(error)
						rejecters.forEach(reject => reject(error))
						rejecters = null
					},
					value => {
						if (status !== FORKING) return
						status = RESOLVED
						_value = value
						resolve(value)
						resolvers.forEach(resolve => resolve(value))
						resolvers = null
					}
				)
				break
			case FORKING:
				rejecters.push(reject)
				resolvers.push(resolve)
				break
			case RESOLVED:
				resolve(_value)
				break
			case REJECTED:
				reject(_value)
				break
		}
	})
}

export default cache
