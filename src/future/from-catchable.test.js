/* eslint-env mocha */
import expect from 'must'
import fromCatchable from './from-catchable'
import relativePath from '../../test/relative-path'
import Spy from '../../test/spy'
import throwWhenCalled from '../../test/throw-when-called'

describe(relativePath(__filename), () => {
	describe('fromCatchable(creator)', () => {
		it('should be a function', () => {
			expect(fromCatchable).to.be.a.function()
		})

		it('should convert thrown errors into rejections', () => {
			const throw69 = () => { throw 69 }
			const future = fromCatchable(throw69)
			const onReject = Spy()
			future.fork(onReject, throwWhenCalled)
			expect(onReject.calls).to.eql([ [ 69 ] ])
		})

		it('should convert thrown errors into rejections', () => {
			const return42 = () => 42
			const future = fromCatchable(return42)
			const onResolve = Spy()
			future.fork(throwWhenCalled, onResolve)
			expect(onResolve.calls).to.eql([ [ 42 ] ])
		})
	})
})
