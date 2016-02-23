/* eslint-env mocha */
import expect from 'must'
import identity from './identity'
import relativePath from '../test/relative-path'

describe(relativePath(__filename), () => {
	describe('identity(value)', () => {
		it('should be a function', () => {
			expect(identity).to.be.a.function()
		})
		
		it('should return its argument', () => {
			expect(identity()).to.be.undefined()
			expect(identity([1, 2, 3])).to.eql([1, 2, 3])
		})
	})
})
