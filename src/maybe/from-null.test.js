/* eslint-env mocha */
import expect from 'must'
import justFromNull from './from-null'
import relativePath from '../../test/relative-path'

describe(relativePath(__filename), () => {
	describe('justFromNull', () => {
		it('should be a function', () => {
			expect(justFromNull).to.be.a.function()
		})

		it('should create Nothing from NaN', () => {
			expect(justFromNull(NaN).otherwise(42)).to.be.nan()
			expect(justFromNull(undefined).otherwise(42)).to.be.undefined()
			expect(justFromNull(null).otherwise(42)).to.eql(42)
			expect(justFromNull(false).otherwise(42)).to.be.false()
		})
	})
})
