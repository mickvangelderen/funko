/* eslint-env mocha */
import expect from 'must'
import Failure from './failure'
import relativePath from '../../test/relative-path'

describe(relativePath(__filename), () => {
	describe('Failure(value)', () => {
		it('should be a function', () => {
			expect(Failure).to.be.a.function()
		})

		it('should create an object', () => {
			const id = x => x
			const just42 = () => 42
			const inc = x => x + 1
			const incFailure = x => Failure(x + 1)

			const a = Failure(5)
			expect(a).to.be.an.object()
			expect(a.fork(id, just42)).to.eql(5)

			const b = Failure(5).map(inc)
			expect(b).to.be.an.object()
			expect(b.fork(id, just42)).to.eql(5)

			const c = Failure(5).mapFailure(inc)
			expect(c).to.be.an.object()
			expect(c.fork(id, just42)).to.eql(6)

			const d = Failure(5).chain(incFailure)
			expect(d).to.be.an.object()
			expect(d.fork(id, just42)).to.eql(5)

			const e = Failure(5).chainFailure(incFailure)
			expect(e).to.be.an.object()
			expect(e.fork(id, just42)).to.eql(6)
		})
	})
})
