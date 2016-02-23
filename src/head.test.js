/* eslint-env mocha */
import expect from 'must'
import head from './head'
import relativePath from '../test/relative-path'

describe(relativePath(__filename), () => {
	describe('head(list)', () => {
		it('should be a function', () => {
			expect(head).to.be.a.function()
		})
		
		it('should return the first item of a list', () => {
			expect(head([1, 2, 3])).to.equal(1)
		})
	})
})
