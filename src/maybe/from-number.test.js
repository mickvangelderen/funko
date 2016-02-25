/* eslint-env mocha */
import expect from 'must'
import fromNumber from './from-number'
import relativePath from '../../test/relative-path'

describe(relativePath(__filename), () => {
	describe('fromNumber', () => {
		it('should be a function', () => {
			expect(fromNumber).to.be.a.function()
		})

		it('should create Nothing from NaN', () => {
			expect(fromNumber(NaN).otherwise(42)).to.eql(42)
			expect(fromNumber(undefined).otherwise(42)).to.be.undefined()
			expect(fromNumber(null).otherwise(42)).to.be.null()
			expect(fromNumber(false).otherwise(42)).to.be.false()
		})
	})
})
