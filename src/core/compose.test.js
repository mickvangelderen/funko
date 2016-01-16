/* eslint-env mocha */
import expect from 'must'
import compose from './compose'

describe(__filename, () => {
	it('should compose functions', () => {
		const inc = x => x + 1
		const triple = x => 3*x
		const f = compose([ triple, inc, triple, inc ])
		expect(f).to.be.a.function()
		expect(f(42)).to.equal(390)
	})
})
