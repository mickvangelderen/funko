/* eslint-env mocha */
import Delayed from './'
import expect from 'must'
import relativePath from '../../test/relative-path'
import allSeries from './all-series'
import SynchronousTimeout from '../../test/synchronous-timeout'

describe(relativePath(__filename), () => {
	describe('allSeries(delayeds)', () => {
		it('should be a function', () => {
			expect(allSeries).to.be.a.function()
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

		it('should resolve delayeds in series', () => {
			let result = null
			allSeries([
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
