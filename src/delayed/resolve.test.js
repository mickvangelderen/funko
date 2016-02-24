/* eslint-env mocha */
import expect from 'must'
import resolve from './resolve'
import relativePath from '../../test/relative-path'

describe(relativePath(__filename), () => {
	describe('resolve(func, resolvable)', () => {
		it('should be a function', () => {
			expect(resolve).to.be.a.function()
		})

		it('should call resolve on resolveable', () => {
			let result = null
			resolve(value => result = value)({
				resolve: resolve => resolve(42)
			})
			expect(result).to.eql(42)
		})
	})
})
