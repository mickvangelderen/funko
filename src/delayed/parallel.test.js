/* eslint-env mocha */
import Delayed from './'
import expect from 'must'
import parallel from './parallel'
import relativePath from '../../test/relative-path'
import SynchronousTimeout from '../../test/synchronous-timeout'

describe(relativePath(__filename), () => {
	describe('parallel(delayeds)', () => {
		it('should be a function', () => {
			expect(parallel).to.be.a.function()
		})

		let delayedValue = null
		let advance = null

		beforeEach(() => {
			const o = SynchronousTimeout()
			delayedValue = (value, delay) => Delayed(resolve => {
				o.setTimeout(() => resolve(value), delay)
			})
			advance = o.advance
		})

		it('should resolve delayeds in parallel', () => {
			let result = null
			parallel([
				delayedValue('ten', 10),
				delayedValue('twenty', 20),
				delayedValue('ten', 10).chain(() => delayedValue('thirty', 20))
			]).resolve(value => result = value)
			expect(advance()).to.eql(10)
			expect(result).to.be.null()
			expect(advance()).to.eql(20)
			expect(result).to.be.null()
			expect(advance()).to.eql(30)
			expect(result).to.eql([ 'ten', 'twenty', 'thirty' ])
		})
	})
})
