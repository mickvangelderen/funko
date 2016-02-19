/* eslint-env mocha */
import hello from './'
import expect from 'must'

describe(__filename, () => {
	it('should export a function', () => {
		expect(hello).to.be.a.function()
	})

	it('should return "Hello World!" when called', () => {
		expect(hello()).to.equal("Hello World!")
	})
})
