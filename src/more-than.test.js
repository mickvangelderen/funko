/* eslint-env mocha */
import moreThan from './more-than'
import expect from 'must'
import relativePath from '../test/relative-path'

describe(relativePath(__filename), () => {
	describe('moreThan(b, a)', () => {
		it('should be a function', () => {
			expect(moreThan).to.be.a.function()
		})

		it('should compare two numbers', () => {
			expect(moreThan(3, 4)).to.be.true()
			expect(moreThan(4, 4)).to.be.false()
			expect(moreThan(5, 4)).to.be.false()
		})

		it('should be curried', () => {
			const moreThan3 = moreThan(3)
			expect(moreThan3).to.be.a.function()
			expect(moreThan3(4)).to.be.true()
		})
	})
})
