/* eslint-env mocha */
import Delayed from './'
import expect from 'must'
import relativePath from '../../test/relative-path'
import SynchronousTimeout from '../../test/synchronous-timeout'

describe(relativePath(__filename), () => {
	describe('Delayed(func)', () => {
		it('should be a function', () => {
			expect(Delayed).to.be.a.function()
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

		it('should resolve', () => {
			const d = delayedValue('ten', 10)
			expect(d).to.be.an.object()
			let result = null
			d.resolve(value => result = value)
			expect(advance()).to.eql(10)
			expect(result).to.eql('ten')
		})

		it('should resolve multiple times', () => {
			let calls = 0
			const d = Delayed(resolve => {
				calls++
				delayedValue('ten', 10).resolve(resolve)
			})
			let result = null
			d.resolve(value => result = value)
			expect(result).to.be.null()
			expect(advance()).to.eql(10)
			expect(result).to.eql('ten')
			result = null
			d.resolve(value => result = value)
			expect(result).to.be.null()
			expect(advance()).to.eql(20)
			expect(result).to.eql('ten')
		})

		it('should map', () => {
			const d = delayedValue('ten', 10)
			let result = null
			d.map(s => s.toUpperCase()).resolve(value => result = value)
			expect(advance()).to.eql(10)
			expect(result).to.eql('TEN')
		})

		it('should chain', () => {
			const d = delayedValue('ten', 10)
			let result = null
			d.chain(s => delayedValue(s.toUpperCase(), 10)).resolve(value => result = value)
			expect(advance()).to.eql(10)
			expect(result).to.be.null
			expect(advance()).to.eql(20)
			expect(result).to.eql('TEN')
		})
	})
})
