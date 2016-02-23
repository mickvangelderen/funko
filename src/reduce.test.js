/* eslint-env mocha */
import expect from 'must'
import reduce from './reduce'
import relativePath from '../test/relative-path'

describe(relativePath(__filename), () => {
	describe('reduce(func, initialValue, reducable)', () => {
		it('should be a function', () => {
			expect(reduce).to.be.a.function()
		})

		let list = null
		let max = null
		let result = null

		beforeEach(() => {
			list = [3, 5, 4]
			max = (l, r) => Math.max(l, r)
			result = 5
		})

		it('should reduce reducables', () => {
			expect(reduce(max, 0, list)).to.equal(result)
		})

		it('should be curried', () => {
			const f = reduce(max)
			expect(f(0, list)).to.equal(result)
		})
	})
})
