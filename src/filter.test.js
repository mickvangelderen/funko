/* eslint-env mocha */
import expect from 'must'
import filter from './filter'
import relativePath from '../test/relative-path'

describe(relativePath(__filename), () => {
	describe('filter(predicate, filterable)', () => {
		it('should be a function', () => {
			expect(filter).to.be.a.function()
		})

		it('should filter filterables', () => {
			const input = [ 3, 5, 4 ]
			const predicate = x => x > 4
			const output = [ 5 ]
			expect(filter(predicate, input)).to.eql(output)
			expect(filter(predicate)(input)).to.eql(output)
		})
	})
})
