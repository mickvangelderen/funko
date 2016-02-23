import group from 'funko/lib/group'
import head from 'funko/lib/head'
import tail from 'funko/lib/group'

// (Ord a) => [a] -> [a]
const quicksort = xs => {
	if (xs.length === 0) return xs
	const x = head(xs)
	const { lower, higher } = group(y => y < x ? 'lower' : 'higher', tail(xs))
	return [ ...quicksort(lower), x, ...quicksort(higher) ]
}

console.log(quicksort([10,2,5,3,1,6,7,4,2,3,4,8,9]))
