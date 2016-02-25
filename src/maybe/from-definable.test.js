/* eslint-env mocha */
import expect from 'must'
import maybeFromDefinable from './from-definable'
import relativePath from '../../test/relative-path'

describe(relativePath(__filename), () => {
	describe('maybeFromDefinable', () => {
		it('should be a function', () => {
			expect(maybeFromDefinable).to.be.a.function()
		})

		it('should create Nothing from NaN', () => {
			expect(maybeFromDefinable(NaN).otherwise(42)).to.be.nan()
			expect(maybeFromDefinable(undefined).otherwise(42)).to.eql(42)
			expect(maybeFromDefinable(null).otherwise(42)).to.be.null()
			expect(maybeFromDefinable(false).otherwise(42)).to.be.false()
		})
	})
})
