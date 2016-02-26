/* eslint-env mocha */
import expect from 'must'
import map from './map'
import relativePath from '../test/relative-path'

describe(relativePath(__filename), () => {
	describe('map(func, thing)', () => {
		it('should be a function', () => {
			expect(map).to.be.a.function()
		})

		const inc = x => x + 1

		it('should call map on mappable', () => {
			expect(map(inc, { map: f => f(1) })).to.eql(2)
		})

		it('should be curried', () => {
			expect(map(inc)({ map: f => f(1) })).to.eql(2)
		})
	})
})
