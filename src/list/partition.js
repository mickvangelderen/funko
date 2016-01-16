import rawCurry from '../internal/raw-curry'

// (a -> Bool) -> [a] -> { pass: [a], fail: [a] }
export const partition = rawCurry(2, 
	(predicate, list) => {
		const pass = []
		const fail = []
		list.forEach(item => (predicate(item) ? pass : fail).push(item))
		return { pass, fail }
	}
)

export default partition
