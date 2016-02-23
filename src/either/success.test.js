/* eslint-env mocha */
import expect from 'must'
import Success from './success'
import relativePath from '../../test/relative-path'

describe(relativePath(__filename), () => {
	describe('Success(value)', () => {
		it('should be a function', () => {
			expect(Success).to.be.a.function()
		})

		it('should create an object', () => {
			const id = x => x
			const just42 = () => 42
			const inc = x => x + 1
			const incSuccess = x => Success(x + 1)

			const a = Success(5)
			expect(a).to.be.an.object()
			expect(a.fork(just42, id)).to.eql(5)

			const b = Success(5).map(inc)
			expect(b).to.be.an.object()
			expect(b.fork(just42, id)).to.eql(6)

			const c = Success(5).mapFailure(inc)
			expect(c).to.be.an.object()
			expect(c.fork(just42, id)).to.eql(5)

			const d = Success(5).chain(incSuccess)
			expect(d).to.be.an.object()
			expect(d.fork(just42, id)).to.eql(6)

			const e = Success(5).chainFailure(incSuccess)
			expect(e).to.be.an.object()
			expect(e.fork(just42, id)).to.eql(5)
		})
	})
})
