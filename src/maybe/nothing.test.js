/* eslint-env mocha */
import expect from 'must'
import Nothing from './nothing'
import relativePath from '../../test/relative-path'

describe(relativePath(__filename), () => {
	describe('Nothing()', () => {
		it('should be a function', () => {
			expect(Nothing).to.be.a.function()
		})

		const throwWhenCalled = () => { throw new Error(`Did not expect this function to be called.`) }

		it('should create an object', () => {
			const a = Nothing()
			expect(a).to.be.an.object()
			expect(a.otherwise(42)).to.eql(42)

			const b = Nothing().map(throwWhenCalled)
			expect(b).to.be.an.object()
			expect(b.otherwise(42)).to.eql(42)

			const c = Nothing().chain(throwWhenCalled)
			expect(c).to.be.an.object()
			expect(c.otherwise(42)).to.eql(42)

			const d = Nothing().chainLeft(Nothing)
			expect(d).to.be.an.object()
			expect(d.otherwise(42)).to.eql(42)

			const e = Nothing().chainBoth(Nothing, throwWhenCalled)
			expect(e).to.be.an.object()
			expect(e.otherwise(42)).to.eql(42)
		})
	})
})
