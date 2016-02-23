/* eslint-env mocha */
import expect from 'must'
import tail from './tail'
import relativePath from '../test/relative-path'

describe(relativePath(__filename), () => {
	describe('tail(list)', () => {
		it('should be a function', () => {
			expect(tail).to.be.a.function()
		})

		it('should get all except for the first elements of a list', () => {
			expect(tail([ 3, 4, 5 ])).to.eql([ 4, 5 ])
		})
	})
})
