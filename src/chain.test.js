/* eslint-env mocha */
import expect from 'must'
import chain from './chain'
import relativePath from '../test/relative-path'

describe(relativePath(__filename), () => {
	describe('chain(func, chainable)', () => {
		it('should be a function', () => {
			expect(chain).to.be.a.function()
		})

		let inc = null
		let input = null
		let output = null

		beforeEach(() => {
			inc = x => x + 1
			input = {
				chain: f => f(1)
			}
			output = 2
		})

		it('should call chain on chainable', () => {
			expect(chain(inc, input)).to.eql(output)
		})

		it('should be curried', () => {
			const f = chain(inc)
			expect(f).to.be.a.function()
			expect(f(input)).to.eql(output)
		})
	})
})
