/* eslint-env mocha */
import expect from 'must'
import justFromBool from './from-bool'
import relativePath from '../../test/relative-path'

describe(relativePath(__filename), () => {
	describe('justFromBool', () => {
		it('should be a function', () => {
			expect(justFromBool).to.be.a.function()
		})

		it('should create Nothing from NaN', () => {
			expect(justFromBool(NaN).otherwise(42)).to.be.nan()
			expect(justFromBool(undefined).otherwise(42)).to.be.undefined()
			expect(justFromBool(null).otherwise(42)).to.be.null()
			expect(justFromBool(false).otherwise(42)).to.eql(42)
		})
	})
})
