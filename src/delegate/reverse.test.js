/* eslint-env mocha */
import expect from 'must'
import reverse from './reverse'
import relativePath from '../../test/relative-path'

describe(relativePath(__filename), () => {
	it('should reverse things', () => {
		expect(reverse([ 3, 4, 5 ])).to.eql([ 5, 4, 3 ])
	})
})
