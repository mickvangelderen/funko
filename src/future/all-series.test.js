/* eslint-env mocha */
import allSeries from './all-series'
import expect from 'must'
import Future from './'
import identity from '../identity'
import relativePath from '../../test/relative-path'
import Spy from '../../test/spy'
import SynchronousTimeout from '../../test/synchronous-timeout'
import throwWhenCalled from '../../test/throw-when-called'

describe(relativePath(__filename), () => {
	describe('allSeries(futures)', () => {
		it('should be a function', () => {
			expect(allSeries).to.be.a.function()
		})

		let resolve = null
		let reject = null
		let advance = null
		let delayedRejected = null
		let delayedResolved = null

		beforeEach(() => {
			resolve = Spy(identity)
			reject = Spy(identity)
			const o = SynchronousTimeout()
			delayedRejected = (value, delay) => Future(reject =>
				o.setTimeout(() => reject(value), delay)
			)
			delayedResolved = (value, delay) => Future((reject, resolve) =>
				o.setTimeout(() => resolve(value), delay)
			)
			advance = o.advance
		})

		it('should resolve futures in series', () => {
			allSeries([
				delayedResolved('ten', 10),
				delayedResolved('twenty', 20),
				delayedResolved('ten', 10).chain(() => delayedResolved('thirty', 20))
			]).fork(throwWhenCalled, resolve)
			expect(advance()).to.eql(10)
			expect(resolve.calls).to.have.length(0)
			expect(advance()).to.eql(30)
			expect(resolve.calls).to.have.length(0)
			expect(advance()).to.eql(40)
			expect(resolve.calls).to.have.length(0)
			expect(advance()).to.eql(60)
			expect(resolve.calls).to.eql([ [ [ 'ten', 'twenty', 'thirty' ] ] ])
			expect(advance()).to.eql(60)
		})

		it('should reject when one of the passed futures rejects', () => {
			allSeries([
				delayedResolved('ten', 10),
				delayedRejected('twenty', 20),
				delayedResolved('ten', 10).chain(() => delayedResolved('thirty', 20))
			]).fork(reject, throwWhenCalled)
			expect(advance()).to.eql(10)
			expect(reject.calls).to.have.length(0)
			expect(advance()).to.eql(30)
			expect(reject.calls).to.eql([ [ 'twenty' ] ])
			// The rest of the futures aren't even forked. 
			expect(advance()).to.eql(30)
		})

		it('should reject or resolve only once', () => {
			allSeries([
				delayedRejected('ten', 10),
				delayedResolved('twenty', 20),
				delayedRejected('thirty', 30)
			]).fork(reject, throwWhenCalled)
			expect(advance()).to.eql(10)
			expect(reject.calls).to.eql([ [ 'ten' ] ])
			// The rest of the futures aren't even forked. 
			expect(advance()).to.eql(10)
		})
	})
})
