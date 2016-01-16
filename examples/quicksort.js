import { head, tail, partition, lessThan } from '../src'

// (Ord a) => [a] -> [a]
const quicksort = xs => {
	if (xs.length === 0) return xs
	const x = head(xs)
	const { pass, fail } = partition(lessThan(x), tail(xs))
	return [ ...quicksort(pass), x, ...quicksort(fail) ]
}

console.log(quicksort([10,2,5,3,1,6,7,4,2,3,4,8,9]))
