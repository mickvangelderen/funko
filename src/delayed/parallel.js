import Delayed from './delayed'

// [Delayed a] -> Delayed [a]
const delayedParallel = delayeds => 
	Delayed(resolve => {
		let pending = delayeds.length
		const values = []
		if (pending === 0) return resolve(values)
		delayeds.forEach((delayed, index) => delayed.resolve(value => {
			values[index] = value
			if (--pending === 0) resolve(values)
		}))
	})

export default delayedParallel
