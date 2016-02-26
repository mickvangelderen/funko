/* eslint-env mocha */
import expect from 'must'
import mapBoth from './map-both'
import relativePath from '../test/relative-path'

describe(relativePath(__filename), () => {
	describe('mapBoth(func, thing)', () => {
		it('should be a function', () => {
			expect(mapBoth).to.be.a.function()
		})

		const inc = x => x + 1
		const dec = x => x - 1

		it('should call mapBoth on both mappable', () => {
			expect(mapBoth(inc, dec, { mapBoth: f => f(1) })).to.eql(2)
			expect(mapBoth(inc, dec, { mapBoth: (f, g) => g(1) })).to.eql(0)
		})

		it('should be curried', () => {
			expect(mapBoth(inc)(dec)({ mapBoth: f => f(1) })).to.eql(2)
			expect(mapBoth(inc)(dec)({ mapBoth: (f, g) => g(1) })).to.eql(0)
		})
	})
})
