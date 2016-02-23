/* eslint-env mocha */
import expect from 'must'
import map from './map'
import relativePath from '../test/relative-path'

describe(relativePath(__filename), () => {
	describe('map(func, mappable)', () => {
		it('should be a function', () => {
			expect(map).to.be.a.function()
		})

		let inc = null
		let list = null
		let result = null

		beforeEach(() => {
			inc = x => x + 1
			list = [3, 4, 5]
			result = [4, 5, 6]
		})

		it('should map over a list', () => {
			expect(map(inc, list)).to.eql(result)
		})

		it('should be curried', () => {
			const m = map(inc)
			expect(m).to.be.a.function()
			expect(m(list)).to.eql(result)
		})
	})
})
