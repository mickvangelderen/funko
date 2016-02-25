/* eslint-env mocha */
import expect from 'must'
import fromNullable from './from-nullable'
import relativePath from '../../test/relative-path'

describe(relativePath(__filename), () => {
	describe('fromNullable', () => {
		it('should be a function', () => {
			expect(fromNullable).to.be.a.function()
		})

		it('should create Nothing from NaN', () => {
			expect(fromNullable(NaN).otherwise(42)).to.be.nan()
			expect(fromNullable(undefined).otherwise(42)).to.be.undefined()
			expect(fromNullable(null).otherwise(42)).to.eql(42)
			expect(fromNullable(false).otherwise(42)).to.be.false()
		})
	})
})
