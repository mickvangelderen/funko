/* eslint-env mocha */
import atMost from './at-most'
import expect from 'must'
import relativePath from '../test/relative-path'

describe(relativePath(__filename), () => {
	describe('atMost(b, a)', () => {
		it('should be a function', () => {
			expect(atMost).to.be.a.function()
		})

		it('should compare two numbers', () => {
			expect(atMost(3, 4)).to.be.false()
			expect(atMost(4, 4)).to.be.true()
			expect(atMost(5, 4)).to.be.true()
		})

		it('should be curried', () => {
			const atMost3 = atMost(3)
			expect(atMost3).to.be.a.function()
			expect(atMost3(4)).to.be.false()
		})
	})
})
