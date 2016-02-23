/* eslint-env mocha */
import atLeast from './at-least'
import expect from 'must'
import relativePath from '../test/relative-path'

describe(relativePath(__filename), () => {
	describe('atLeast(b, a)', () => {
		it('should be a function', () => {
			expect(atLeast).to.be.a.function()
		})

		it('should compare two numbers', () => {
			expect(atLeast(3, 4)).to.be.true()
			expect(atLeast(4, 4)).to.be.true()
			expect(atLeast(5, 4)).to.be.false()
		})

		it('should be curried', () => {
			const atLeast3 = atLeast(3)
			expect(atLeast3).to.be.a.function()
			expect(atLeast3(4)).to.be.true()
		})
	})
})
