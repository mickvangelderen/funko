import curry from './curry'

// (a -> String) -> [a] -> { String -> a }
const group = curry(2, 
	(toKey, list) => {
		const result = {}
		list.forEach(item => {
			const key = toKey(item)
			const target = result.hasOwnProperty(key) ?
				result[key] :
				result[key] = []
			target.push(item)
		})
		return result
	}
)

export default group
