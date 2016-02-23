/* eslint-env mocha */
import expect from 'must'
import hello from './'
import relativePath from '../test/relative-path'

describe(relativePath(__filename), () => {
	it('should export a function', () => {
		expect(hello).to.be.a.function()
	})

	it('should return "Hello World!" when called', () => {
		expect(hello()).to.equal("Hello World!")
	})
})
