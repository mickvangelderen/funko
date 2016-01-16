import Delayed from './delayed'

// [Delayed a] -> Delayed [a]
export const delayedFromParallel = tasks => 
	Delayed(resolve => {
		let pending = tasks.length
		const values = []
		if (pending === 0) return resolve(values)
		tasks.forEach((task, index) => task.resolve(value => {
			values[index] = value
			if (--pending === 0) resolve(values)
		}))
	})

export default delayedFromParallel
