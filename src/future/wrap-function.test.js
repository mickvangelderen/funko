/* eslint-env mocha */
import expect from 'must'
import wrapFunction from './wrap-function'
import identity from '../identity'
import relativePath from '../../test/relative-path'
import Spy from '../../test/spy'

describe(relativePath(__filename), () => {
	describe('wrapFunction(func)', () => {
		it('should be a function', () => {
			expect(wrapFunction).to.be.a.function()
		})

		const throwWhenCalled = () => { throw new Error(`Did not expect this function to be called.`) }

		let resolve = null
		let reject = null

		beforeEach(() => {
			resolve = Spy(identity)
			reject = Spy(identity)
		})

		it('should create a function that can reject the returned future', () => {
			const func = wrapFunction((value, callback) => callback(value))
			const future = func(69)
			future.fork(reject, throwWhenCalled)
			expect(reject.calls).to.eql([ [ 69 ] ])
		})

		it('should create a function that can resolve the returned future', () => {
			const func = wrapFunction((value, callback) => callback(null, value))
			const future = func(42)
			future.fork(throwWhenCalled, resolve)
			expect(resolve.calls).to.eql([ [ 42 ] ])
		})
	})
})
