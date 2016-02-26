/* eslint-env mocha */
import expect from 'must'
import mapLeft from './map-left'
import relativePath from '../test/relative-path'

describe(relativePath(__filename), () => {
	describe('mapLeft(func, thing)', () => {
		it('should be a function', () => {
			expect(mapLeft).to.be.a.function()
		})

		const inc = x => x + 1

		it('should call mapLeft on left mappable', () => {
			expect(mapLeft(inc, { mapLeft: f => f(1) })).to.eql(2)
		})

		it('should be curried', () => {
			expect(mapLeft(inc)({ mapLeft: f => f(1) })).to.eql(2)
		})
	})
})
