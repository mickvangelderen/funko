/* eslint-env mocha */
import expect from 'must'
import wrapCatchable from './wrap-catchable'
import relativePath from '../../test/relative-path'
import Spy from '../../test/spy'
import throwWhenCalled from '../../test/throw-when-called'

describe(relativePath(__filename), () => {
	describe('wrapCatchable(creator)', () => {
		it('should be a function', () => {
			expect(wrapCatchable).to.be.a.function()
		})

		it('should convert thrown errors into rejections', () => {
			const throwValue = Spy(value => { throw value })
			const createFuture = wrapCatchable(throwValue)
			const onReject = Spy()
			createFuture(69, 'hello', 'darkness')
			.fork(onReject, throwWhenCalled)
			// Passes all arguments
			expect(throwValue.calls).to.eql([ [ 69, 'hello', 'darkness' ] ])
			expect(onReject.calls).to.eql([ [ 69 ] ])
		})

		it('should convert thrown errors into rejections', () => {
			const returnValue = Spy(value => value)
			const createFuture = wrapCatchable(returnValue)
			const onResolve = Spy()
			createFuture(42, 'my', 'old', 'friend')
			.fork(throwWhenCalled, onResolve)
			// Passes all arguments
			expect(returnValue.calls).to.eql([ [ 42, 'my', 'old', 'friend' ] ])
			expect(onResolve.calls).to.eql([ [ 42 ] ])
		})
	})
})
