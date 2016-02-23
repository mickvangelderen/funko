/* eslint-env mocha */
import expect from 'must'
import pipe from './pipe'
import relativePath from '../test/relative-path'

describe(relativePath(__filename), () => {
	describe('pipe(funcs, arg)', () => {
		it('should be a function', () => {
			expect(pipe).to.be.a.function()
		})

		let inc = null
		let triple = null

		beforeEach(() => {
			inc = x => x + 1
			triple = x => 3*x
		})

		it('should pipe functions', () => {
			expect(pipe([ triple, inc, triple, inc ], 42)).to.equal(382)
		})

		it('should be curried', () => {
			const f = pipe([ triple, inc, triple, inc ])
			expect(f).to.be.a.function()
			expect(f(42)).to.eql(382)
		})
	})
})
