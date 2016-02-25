/* eslint-env mocha */
import compose from '../compose'
import expect from 'must'
import Future from './'
import identity from '../identity'
import relativePath from '../../test/relative-path'
import Spy from '../../test/spy'

describe(relativePath(__filename), () => {
	describe('Future(task)', () => {
		it('should be a function', () => {
			expect(Future).to.be.a.function()
		})

		const double = n => 2*n
		const rejected = value => Future(reject => reject(value))
		const resolved = value => Future((reject, resolve) => resolve(value))
		const throwWhenCalled = () => { throw new Error(`Did not expect this function to be called.`) }

		let resolve = null
		let reject = null
		beforeEach(() => {
			resolve = Spy(identity)
			reject = Spy(identity)
		})

		// rejecting

		it('should reject', () => {
			resolved(42).fork(reject, resolve)
			expect(reject.calls).to.have.length(0)
			expect(resolve.calls).to.eql([ [ 42 ] ])
		})

		it('should reject multiple times', () => {
			const future = rejected(69)
			future.fork(reject, resolve)
			future.fork(reject, resolve)
			expect(reject.calls).to.eql([ [ 69 ], [ 69 ] ])
			expect(resolve.calls).to.have.length(0)
		})

		// resolving

		it('should resolve', () => {
			resolved(42).fork(reject, resolve)
			expect(reject.calls).to.have.length(0)
			expect(resolve.calls).to.eql([ [ 42 ] ])
		})

		it('should resolve multiple times', () => {
			const future = resolved(42)
			future.fork(reject, resolve)
			future.fork(reject, resolve)
			expect(reject.calls).to.have.length(0)
			expect(resolve.calls).to.eql([ [ 42 ], [ 42 ] ])
		})

		// lazy evaluation

		it('should not do anything before fork is called', () => {
			function go(future) {
				future.map(throwWhenCalled)
				.mapLeft(throwWhenCalled)
				.mapBoth(throwWhenCalled, throwWhenCalled)
				.chain(throwWhenCalled)
				.chainLeft(throwWhenCalled)
				.chainBoth(throwWhenCalled, throwWhenCalled)
			}
			go(rejected(69))
			go(resolved(42))
		})

		// map

		it('should not map over rejected futures', () => {
			rejected(69)
			.map(throwWhenCalled)
			.fork(reject, resolve)
			expect(reject.calls).to.eql([ [ 69 ] ])
			expect(resolve.calls).to.have.length(0)
		})

		it('should map over resolved futures', () => {
			resolved(42)
			.map(double)
			.fork(reject, resolve)
			expect(reject.calls).to.have.length(0)
			expect(resolve.calls).to.eql([ [ 84 ] ])
		})

		// mapLeft

		it('should left map over rejected futures', () => {
			rejected(69)
			.mapLeft(double)
			.fork(reject, resolve)
			expect(reject.calls).to.eql([ [ 138 ] ])
			expect(resolve.calls).to.have.length(0)
		})

		it('should not left map over resolved futures', () => {
			resolved(42)
			.mapLeft(throwWhenCalled)
			.fork(reject, resolve)
			expect(reject.calls).to.have.length(0)
			expect(resolve.calls).to.eql([ [ 42 ] ])
		})

		// mapBoth

		it('should both map over rejected futures', () => {
			rejected(69)
			.mapBoth(double, throwWhenCalled)
			.fork(reject, resolve)
			expect(reject.calls).to.eql([ [ 138 ] ])
			expect(resolve.calls).to.have.length(0)
		})

		it('should both map over resolved futures', () => {
			resolved(42)
			.mapBoth(throwWhenCalled, double)
			.fork(reject, resolve)
			expect(reject.calls).to.have.length(0)
			expect(resolve.calls).to.eql([ [ 84 ] ])
		})

		// chain

		it('should not chain over rejected futures', () => {
			rejected(69)
			.chain(throwWhenCalled)
			.fork(reject, resolve)
			expect(reject.calls).to.eql([ [ 69 ] ])
			expect(resolve.calls).to.have.length(0)
		})

		it('should chain rejected after resolved futures', () => {
			resolved(42)
			.chain(compose([ rejected, double ]))
			.fork(reject, resolve)
			expect(reject.calls).to.eql([ [ 84 ] ])
			expect(resolve.calls).to.have.length(0)
		})

		it('should chain resolved after resolved futures', () => {
			resolved(42)
			.chain(compose([ resolved, double ]))
			.fork(reject, resolve)
			expect(reject.calls).to.have.length(0)
			expect(resolve.calls).to.eql([ [ 84 ] ])
		})

		// chainLeft

		it('should left chain rejected after rejected futures', () => {
			rejected(69)
			.chainLeft(compose([ rejected, double ]))
			.fork(reject, resolve)
			expect(reject.calls).to.eql([ [ 138 ] ])
			expect(resolve.calls).to.have.length(0)
		})

		it('should left chain resolved after rejected futures', () => {
			rejected(69)
			.chainLeft(compose([ resolved, double ]))
			.fork(reject, resolve)
			expect(reject.calls).to.have.length(0)
			expect(resolve.calls).to.eql([ [ 138 ] ])
		})

		it('should not left chain over resolved futures', () => {
			resolved(42)
			.chainLeft(throwWhenCalled)
			.fork(reject, resolve)
			expect(reject.calls).to.have.length(0)
			expect(resolve.calls).to.eql([ [ 42 ] ])
		})

		// chainBoth

		it('should both chain rejected after rejected futures', () => {
			rejected(69)
			.chainBoth(compose([ rejected, double ]), throwWhenCalled)
			.fork(reject, resolve)
			expect(reject.calls).to.eql([ [ 138 ] ])
			expect(resolve.calls).to.have.length(0)
		})

		it('should both chain resolved after rejected futures', () => {
			rejected(69)
			.chainBoth(compose([ resolved, double ]), throwWhenCalled)
			.fork(reject, resolve)
			expect(reject.calls).to.have.length(0)
			expect(resolve.calls).to.eql([ [ 138 ] ])
		})

		it('should both chain rejected after resolved futures', () => {
			resolved(42)
			.chainBoth(throwWhenCalled, compose([ rejected, double ]))
			.fork(reject, resolve)
			expect(reject.calls).to.eql([ [ 84 ] ])
			expect(resolve.calls).to.have.length(0)
		})

		it('should both chain resolved after resolved futures', () => {
			resolved(42)
			.chainBoth(throwWhenCalled, compose([ resolved, double ]))
			.fork(reject, resolve)
			expect(reject.calls).to.have.length(0)
			expect(resolve.calls).to.eql([ [ 84 ] ])
		})
	})
})
