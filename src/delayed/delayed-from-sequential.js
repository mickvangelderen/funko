import Delayed from './delayed'

// [Delayed a] -> Delayed [a]
export const delayedFromSequential = tasks => 
	Delayed(resolve => {
		const values = []
		const next = index => {
			if (index >= tasks.length) return resolve(values)
			tasks[index].resolve(value => {
				values[index] = value
				next(index + 1)
			})
		}
		next(0)
	})

export default delayedFromSequential
