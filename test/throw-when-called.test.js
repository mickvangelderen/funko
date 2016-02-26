/* eslint-env mocha */
import expect from 'must'
import relativePath from './relative-path'
import throwWhenCalled from './throw-when-called'

describe(relativePath(__filename), () => {
	describe('throwWhenCalled()', () => {
		it('should be a function', () => {
			expect(throwWhenCalled).to.be.a.function()
		})

		it('should throw when called', () => {
			expect(throwWhenCalled).to.throw()
		})
	})
})
