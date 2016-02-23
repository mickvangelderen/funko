/* eslint-env mocha */
import expect from 'must'
import reverse from './reverse'
import relativePath from '../test/relative-path'

describe(relativePath(__filename), () => {
	describe('reverse(reversable)', () => {
		it('should be a function', () => {
			expect(reverse).to.be.a.function()
		})

		it('should reverse over a list', () => {
			expect(reverse([ 3, 4, 5 ])).to.eql([ 5, 4, 3 ])
		})
	})
})
