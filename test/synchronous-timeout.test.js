/* eslint-env mocha */
import expect from 'must'
import relativePath from './relative-path'
import SynchronousTimeout from './synchronous-timeout'

describe(relativePath(__filename), () => {
	describe('SynchronousTimeout()', () => {
		it('should be a function', () => {
			expect(SynchronousTimeout).to.be.a.function()
		})

		let setTimeout = null
		let advance = null

		beforeEach(() => {
			const o = SynchronousTimeout()
			setTimeout = o.setTimeout
			advance = o.advance
		})

		it('should return a setTimeout and advance function', () => {
			expect(setTimeout).to.be.a.function()
			expect(advance).to.be.a.function()
		})

		it('should call multiple timeouts at the same time', () => {
			let a = 0, b = 0
			setTimeout(() => a++, 10)
			setTimeout(() => b++, 10)
			expect(a).to.eql(0)
			expect(b).to.eql(0)
			expect(advance()).to.eql(10)
			expect(a).to.eql(1)
			expect(b).to.eql(1)
			expect(advance()).to.eql(10)
			expect(a).to.eql(1)
			expect(b).to.eql(1)
		})

		it('should call multiple timeouts at different times', () => {
			let a = 0, b = 0
			setTimeout(() => a++, 10)
			setTimeout(() => b++, 20)
			expect(a).to.eql(0)
			expect(b).to.eql(0)
			expect(advance()).to.eql(10)
			expect(a).to.eql(1)
			expect(b).to.eql(0)
			expect(advance()).to.eql(20)
			expect(a).to.eql(1)
			expect(b).to.eql(1)
			expect(advance()).to.eql(20)
			expect(a).to.eql(1)
			expect(b).to.eql(1)
		})

		it('should call timouts set in timeouts', () => {
			let a = 0, b = 0
			setTimeout(() => {
				setTimeout(() => b++, 10)
				a++
			}, 10)
			expect(a).to.eql(0)
			expect(b).to.eql(0)
			expect(advance()).to.eql(10)
			expect(a).to.eql(1)
			expect(b).to.eql(0)
			expect(advance()).to.eql(20)
			expect(a).to.eql(1)
			expect(b).to.eql(1)
			expect(advance()).to.eql(20)
			expect(a).to.eql(1)
			expect(b).to.eql(1)
		})
	})
})
