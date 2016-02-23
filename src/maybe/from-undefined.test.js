/* eslint-env mocha */
import expect from 'must'
import justFromUndefined from './from-undefined'
import relativePath from '../../test/relative-path'

describe(relativePath(__filename), () => {
	describe('justFromUndefined', () => {
		it('should be a function', () => {
			expect(justFromUndefined).to.be.a.function()
		})

		it('should create Nothing from NaN', () => {
			expect(justFromUndefined(NaN).otherwise(42)).to.be.nan()
			expect(justFromUndefined(undefined).otherwise(42)).to.eql(42)
			expect(justFromUndefined(null).otherwise(42)).to.be.null()
			expect(justFromUndefined(false).otherwise(42)).to.be.false()
		})
	})
})
