/* eslint-env mocha */
import expect from 'must'
import Nothing from './nothing'
import relativePath from '../../test/relative-path'

describe(relativePath(__filename), () => {
	describe('Nothing()', () => {
		it('should be a function', () => {
			expect(Nothing).to.be.a.function()
		})

		it('should create an object', () => {
			const inc = x => x + 1
			const incNothing = () => Nothing()

			const a = Nothing()
			expect(a).to.be.an.object()
			expect(a.otherwise(42)).to.eql(42)

			const b = Nothing().map(inc)
			expect(b).to.be.an.object()
			expect(b.otherwise(42)).to.eql(42)

			const c = Nothing().mapNothing(inc)
			expect(c).to.be.an.object()
			expect(b.otherwise(42)).to.eql(42)

			const d = Nothing().chain(incNothing)
			expect(d).to.be.an.object()
			expect(d.otherwise(42)).to.eql(42)

			const e = Nothing().chainNothing(incNothing)
			expect(e).to.be.an.object()
			expect(e.otherwise(42)).to.eql(42)
		})
	})
})
