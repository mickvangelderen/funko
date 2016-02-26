/* eslint-env mocha */
import expect from 'must'
import chainLeft from './chain-left'
import relativePath from '../test/relative-path'

describe(relativePath(__filename), () => {
	describe('chainLeft(func, thing)', () => {
		it('should be a function', () => {
			expect(chainLeft).to.be.a.function()
		})

		const inc = x => x + 1

		it('should call chainLeft on left chainable', () => {
			expect(chainLeft(inc, { chainLeft: f => f(1) })).to.eql(2)
		})

		it('should be curried', () => {
			expect(chainLeft(inc)({ chainLeft: f => f(1) })).to.eql(2)
		})
	})
})
