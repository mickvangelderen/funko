/* eslint-env mocha */
import expect from 'must'
import relativePath from './relative-path'
import Spy from './spy'

describe(relativePath(__filename), () => {
	describe('Spy(func)', () => {
		it('should be a function', () => {
			expect(Spy).to.be.a.function()
		})

		it('should record calls', () => {
			const spy = Spy(n => 2*n)
			expect(spy(5)).to.eql(10)
			expect(spy.calls).to.eql([
				[ 5 ]
			])
			expect(spy(7)).to.eql(14)
			expect(spy.calls).to.eql([
				[ 5 ],
				[ 7 ]
			])
		})
	})
})
