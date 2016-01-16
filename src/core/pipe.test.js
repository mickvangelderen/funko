/* eslint-env mocha */
import expect from 'must'
import pipe from './pipe'

describe(__filename, () => {
	it('should pipe functions', () => {
		const inc = x => x + 1
		const triple = x => 3*x
		const f = pipe([ triple, inc, triple, inc ])
		expect(f).to.be.a.function()
		expect(f(42)).to.equal(382)
	})
})
