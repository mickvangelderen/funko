/* eslint-env mocha */
import expect from 'must'
import map from './map'

describe(__filename, () => {
	it('should map things', () => {
		const inc = x => x + 1
		expect(map(inc)([3, 4, 5])).to.eql([4, 5, 6])
		expect(map(inc, [3, 4, 5])).to.eql([4, 5, 6])
	})
})
