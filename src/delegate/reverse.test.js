/* eslint-env mocha */
import expect from 'must'
import reverse from './reverse'

describe(__filename, () => {
	it('should reverse things', () => {
		expect(reverse([ 3, 4, 5 ])).to.eql([ 5, 4, 3 ])
	})
})
