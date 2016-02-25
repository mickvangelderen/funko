import Future from './'

// [Future a b] -> Future [a] b
const futureAll = futures => 
	Future((reject, resolve) => {
		let pending = futures.length
		const values = []
		if (pending === 0) return resolve(values)
		let done = false
		futures.forEach((future, index) => future.fork(
			error => {
				if (done) return
				done = true
				reject(error)
			},
			value => {
				if (done) return
				values[index] = value
				if (--pending === 0) {
					done = true
					resolve(values)
				}
			}
		))
	})

export default futureAll
