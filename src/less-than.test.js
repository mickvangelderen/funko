/* eslint-env mocha */
import lessThan from './less-than'
import expect from 'must'
import relativePath from '../test/relative-path'

describe(relativePath(__filename), () => {
	describe('lessThan(b, a)', () => {
		it('should be a function', () => {
			expect(lessThan).to.be.a.function()
		})

		it('should compare two numbers', () => {
			expect(lessThan(3, 4)).to.be.false()
			expect(lessThan(4, 4)).to.be.false()
			expect(lessThan(5, 4)).to.be.true()
		})

		it('should be curried', () => {
			const lessThan3 = lessThan(3)
			expect(lessThan3).to.be.a.function()
			expect(lessThan3(4)).to.be.false()
		})
	})
})
