import Future from './'

// [Future a b] -> Future [a] b
const futureAllSeries = futures => 
	Future((reject, resolve) => {
		const values = []
		let done = false
		const next = index => {
			if (index >= futures.length) {
				done = true
				return resolve(values)
			}
			futures[index].fork(
				error => {
					if (done) return
					done = true
					reject(error)
				},
				value => {
					if (done) return
					values[index] = value
					next(index + 1)
				})
		}
		next(0)

	})

export default futureAllSeries
