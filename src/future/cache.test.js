/* eslint-env mocha */
import cache from './cache'
import expect from 'must'
import Future from './'
import identity from '../identity'
import relativePath from '../../test/relative-path'
import Spy from '../../test/spy'
import SynchronousTimeout from '../../test/synchronous-timeout'
import throwWhenCalled from '../../test/throw-when-called'

describe(relativePath(__filename), () => {
	describe('cache(future)', () => {
		it('should be a function', () => {
			expect(cache).to.be.a.function()
		})

		let setTimeout = null
		let advance = null

		beforeEach(() => {
			const o = SynchronousTimeout()
			setTimeout = o.setTimeout
			advance = o.advance
		})

		it('should only call a cached resolved once', () => {
			const task = Spy((reject, resolve) => {
				resolve(42)
				reject(null)
				resolve(null)
			})
			const future = cache(Future(task))
			expect(task.calls).to.be.empty()

			function test() {
				const spy = Spy(identity)
				future.fork(throwWhenCalled, spy)
				expect(task.calls).to.have.length(1)
				expect(spy.calls).to.eql([ [ 42 ] ])
			}

			test(future)
			test(future)
		})

		it('should only call a cached rejected once', () => {
			const task = Spy((reject, resolve) => {
				reject(69)
				reject(null)
				resolve(null)
			})
			const future = cache(Future(task))
			expect(task.calls).to.be.empty()

			function test() {
				const spy = Spy(identity)
				future.fork(spy, throwWhenCalled)
				expect(task.calls).to.have.length(1)
				expect(spy.calls).to.eql([ [ 69 ] ])
			}

			test(future)
			test(future)
		})

		it('should save forks called after the first fork but before rejecting', () => {
			const future = cache(Future((reject, resolve) => setTimeout(() => {
				reject(42)
				reject(null)
				resolve(null)
			}, 10)))
			const spy1 = Spy(identity)
			future.fork(spy1, throwWhenCalled) // waiting -> forked
			const spy2 = Spy(identity)
			future.fork(spy2, throwWhenCalled) // forked -> forked
			expect(spy1.calls).to.be.empty()
			expect(spy2.calls).to.be.empty()
			expect(advance()).to.eql(10) // forked -> resolved
			expect(spy1.calls).to.eql([ [ 42 ] ])
			expect(spy2.calls).to.eql([ [ 42 ] ])
			const spy3 = Spy(identity)
			future.fork(spy3, throwWhenCalled) // resolved -> resolved
			expect(spy3.calls).to.eql([ [ 42 ] ])
			expect(advance()).to.eql(10)
		})

		it('should save forks called after the first fork but before resolving', () => {
			const future = cache(Future((reject, resolve) => setTimeout(() => {
				resolve(42)
				reject(null)
				resolve(null)
			}, 10)))
			const spy1 = Spy(identity)
			future.fork(throwWhenCalled, spy1) // waiting -> forked
			const spy2 = Spy(identity)
			future.fork(throwWhenCalled, spy2) // forked -> forked
			expect(spy1.calls).to.be.empty()
			expect(spy2.calls).to.be.empty()
			expect(advance()).to.eql(10) // forked -> resolved
			expect(spy1.calls).to.eql([ [ 42 ] ])
			expect(spy2.calls).to.eql([ [ 42 ] ])
			const spy3 = Spy(identity)
			future.fork(throwWhenCalled, spy3) // resolved -> resolved
			expect(spy3.calls).to.eql([ [ 42 ] ])
			expect(advance()).to.eql(10)
		})
	})
})
