/* eslint-env mocha */
import expect from 'must'
import reduce from './reduce'
import relativePath from '../../test/relative-path'

describe(relativePath(__filename), () => {
	it('should reduce things', () => {
		const max = (l, r) => Math.max(l, r)
		expect(reduce(max)(0)([3, 4, 5])).to.eql(5)
		expect(reduce(max, 0, [3, 4, 5])).to.eql(5)
	})
})
