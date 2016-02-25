/* eslint-env mocha */
import expect from 'must'
import fromBoolean from './from-boolean'
import relativePath from '../../test/relative-path'

describe(relativePath(__filename), () => {
	describe('fromBoolean', () => {
		it('should be a function', () => {
			expect(fromBoolean).to.be.a.function()
		})

		it('should create Nothing from NaN', () => {
			expect(fromBoolean(NaN).otherwise(42)).to.be.nan()
			expect(fromBoolean(undefined).otherwise(42)).to.be.undefined()
			expect(fromBoolean(null).otherwise(42)).to.be.null()
			expect(fromBoolean(false).otherwise(42)).to.eql(42)
		})
	})
})
