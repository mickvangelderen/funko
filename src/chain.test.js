/* eslint-env mocha */
import expect from 'must'
import chain from './chain'
import relativePath from '../test/relative-path'

describe(relativePath(__filename), () => {
	describe('chain(func, thing)', () => {
		it('should be a function', () => {
			expect(chain).to.be.a.function()
		})

		const inc = x => x + 1

		it('should call chain on chainable', () => {
			expect(chain(inc, { chain: f => f(1) })).to.eql(2)
		})

		it('should be curried', () => {
			expect(chain(inc)({ chain: f => f(1) })).to.eql(2)
		})
	})
})
