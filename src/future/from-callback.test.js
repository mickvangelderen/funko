/* eslint-env mocha */
import expect from 'must'
import fromCallback from './from-callback'
import identity from '../identity'
import relativePath from '../../test/relative-path'
import Spy from '../../test/spy'
import throwWhenCalled from '../../test/throw-when-called'

describe(relativePath(__filename), () => {
	describe('fromCallback(creator)', () => {
		it('should be a function', () => {
			expect(fromCallback).to.be.a.function()
		})

		let resolve = null
		let reject = null

		beforeEach(() => {
			resolve = Spy(identity)
			reject = Spy(identity)
		})

		it('should pass a callback that can reject the returned future', () => {
			let callback = null
			const future = fromCallback(cb => callback = cb)
			future.fork(reject, throwWhenCalled)
			expect(reject.calls).to.have.length(0)
			callback(69)
			expect(reject.calls).to.eql([ [ 69 ] ])
		})

		it('should pass a callback that can resolve the returned future', () => {
			let callback = null
			const future = fromCallback(cb => callback = cb)
			future.fork(throwWhenCalled, resolve)
			expect(resolve.calls).to.have.length(0)
			callback(null, 42)
			expect(resolve.calls).to.eql([ [ 42 ] ])
		})
	})
})
