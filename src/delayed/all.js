import Delayed from './'

// [Delayed a] -> Delayed [a]
const delayedAll = delayeds => 
	Delayed(resolve => {
		let pending = delayeds.length
		const values = []
		if (pending === 0) return resolve(values)
		delayeds.forEach((delayed, index) => delayed.resolve(value => {
			values[index] = value
			if (--pending === 0) resolve(values)
		}))
	})

export default delayedAll
