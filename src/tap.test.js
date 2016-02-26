/* eslint-env mocha */
import expect from 'must'
import relativePath from '../test/relative-path'
import Spy from '../test/spy'
import tap from './tap'

describe(relativePath(__filename), () => {
	describe('tap(func, value)', () => {
		it('should be a function', () => {
			expect(tap).to.be.a.function()
		})

		it('should call the function with the argument', () => {
			const spy = Spy(() => {})
			expect(tap(spy, 42)).to.eql(42)
			expect(spy.calls).to.eql([ [ 42 ] ])
		})

		it('should be curried', () => {
			const spy = Spy(() => {})
			expect(tap(spy)(42)).to.eql(42)
			expect(spy.calls).to.eql([ [ 42 ] ])
		})
	})
})
