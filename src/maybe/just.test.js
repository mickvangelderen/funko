/* eslint-env mocha */
import expect from 'must'
import Just from './just'
import relativePath from '../../test/relative-path'
import throwWhenCalled from '../../test/throw-when-called'

describe(relativePath(__filename), () => {
	describe('Just(value)', () => {
		it('should be a function', () => {
			expect(Just).to.be.a.function()
		})

		it('should create an object', () => {
			const inc = x => x + 1
			const incJust = x => Just(x + 1)

			const a = Just(5)
			expect(a).to.be.an.object()
			expect(a.otherwise(42)).to.eql(5)

			const b = Just(5).map(inc)
			expect(b).to.be.an.object()
			expect(b.otherwise(42)).to.eql(6)

			const c = Just(5).chain(incJust)
			expect(c).to.be.an.object()
			expect(c.otherwise(42)).to.eql(6)

			const d = Just(5).chainLeft(throwWhenCalled)
			expect(d).to.be.an.object()
			expect(d.otherwise(42)).to.eql(5)

			const e = Just(5).chainBoth(throwWhenCalled, incJust)
			expect(e).to.be.an.object()
			expect(e.otherwise(42)).to.eql(6)
		})
	})
})
