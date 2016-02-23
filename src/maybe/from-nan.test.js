/* eslint-env mocha */
import expect from 'must'
import justFromNan from './from-nan'
import relativePath from '../../test/relative-path'

describe(relativePath(__filename), () => {
	describe('justFromNan', () => {
		it('should be a function', () => {
			expect(justFromNan).to.be.a.function()
		})

		it('should create Nothing from NaN', () => {
			expect(justFromNan(NaN).otherwise(42)).to.eql(42)
			expect(justFromNan(undefined).otherwise(42)).to.be.undefined()
			expect(justFromNan(null).otherwise(42)).to.be.null()
			expect(justFromNan(false).otherwise(42)).to.be.false()
		})
	})
})
