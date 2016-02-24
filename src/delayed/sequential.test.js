/* eslint-env mocha */
import Delayed from './'
import expect from 'must'
import relativePath from '../../test/relative-path'
import sequential from './sequential'
import SynchronousTimeout from '../../test/synchronous-timeout'

describe(relativePath(__filename), () => {
	describe('sequential(delayeds)', () => {
		it('should be a function', () => {
			expect(sequential).to.be.a.function()
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

		it('should resolve delayeds in sequential', () => {
			let result = null
			sequential([
				delayedValue('ten', 10),
				delayedValue('twenty', 20),
				delayedValue('ten', 10).chain(() => delayedValue('thirty', 20))
			]).resolve(value => result = value)
			expect(advance()).to.eql(10)
			expect(result).to.be.null()
			expect(advance()).to.eql(30)
			expect(result).to.be.null()
			expect(advance()).to.eql(40)
			expect(result).to.be.null()
			expect(advance()).to.eql(60)
			expect(result).to.eql([ 'ten', 'twenty', 'thirty' ])
		})
	})
})
