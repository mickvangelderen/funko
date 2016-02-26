/* eslint-env mocha */
import expect from 'must'
import Failure from './failure'
import relativePath from '../../test/relative-path'
import Success from './success'
import throwWhenCalled from '../../test/throw-when-called'

describe(relativePath(__filename), () => {
	describe('Failure(value)', () => {
		it('should be a function', () => {
			expect(Failure).to.be.a.function()
		})

		it('should create an object', () => {
			const id = x => x
			const inc = x => x + 1
			const incSuccess = x => Success(x + 1)
			const incFailure = x => Failure(x + 1)

			// Fork

			expect(
				Failure(5)
				.fork(id, throwWhenCalled)
			).to.eql(5)
			
			// Map

			expect(
				Failure(5).map(inc)
				.fork(id, throwWhenCalled)
			).to.eql(5)
			
			expect(
				Failure(5).mapLeft(inc)
				.fork(id, throwWhenCalled)
			).to.eql(6)
			
			expect(
				Failure(5).mapBoth(inc, throwWhenCalled)
				.fork(id, throwWhenCalled)
			).to.eql(6)
			
			// Chain into Failure

			expect(
				Failure(5).chain(incFailure)
				.fork(id, throwWhenCalled)
			).to.eql(5)
			
			expect(
				Failure(5).chainLeft(incFailure)
				.fork(id, throwWhenCalled)
			).to.eql(6)
			
			expect(
				Failure(5).chainBoth(incFailure, throwWhenCalled)
				.fork(id, throwWhenCalled)
			).to.eql(6)

			// Chain into Success
			
			expect(
				Failure(5).chain(incSuccess)
				.fork(id, throwWhenCalled)
			).to.eql(5)
			
			expect(
				Failure(5).chainLeft(incSuccess)
				.fork(throwWhenCalled, id)
			).to.eql(6)
			
			expect(
				Failure(5).chainBoth(incSuccess, throwWhenCalled)
				.fork(throwWhenCalled, id)
			).to.eql(6)

		})
	})
})
