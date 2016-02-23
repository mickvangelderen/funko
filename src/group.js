import curry from './curry'
import reduce from './reduce'

// (a -> String) -> [a] -> { String -> a }
const group = curry(2, 
	(toKey, list) => reduce(
		(map, item) => {
			const key = toKey(item)
			const target = map.hasOwnProperty(key) ?
				map[key] :
				map[key] = []
			target.push(item)
			return map
		}, {}, list
	)
)

export default group
