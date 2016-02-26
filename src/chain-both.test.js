/* eslint-env mocha */
import expect from 'must'
import chainBoth from './chain-both'
import relativePath from '../test/relative-path'

describe(relativePath(__filename), () => {
	describe('chainBoth(func, thing)', () => {
		it('should be a function', () => {
			expect(chainBoth).to.be.a.function()
		})

		const inc = x => x + 1
		const dec = x => x - 1

		it('should call chainBoth on both chainable', () => {
			expect(chainBoth(inc, dec, { chainBoth: f => f(1) })).to.eql(2)
			expect(chainBoth(inc, dec, { chainBoth: (f, g) => g(1) })).to.eql(0)
		})

		it('should be curried', () => {
			expect(chainBoth(inc)(dec)({ chainBoth: f => f(1) })).to.eql(2)
			expect(chainBoth(inc)(dec)({ chainBoth: (f, g) => g(1) })).to.eql(0)
		})
	})
})
