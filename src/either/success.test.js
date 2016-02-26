/* eslint-env mocha */
import expect from 'must'
import Failure from './failure'
import relativePath from '../../test/relative-path'
import Success from './success'
import throwWhenCalled from '../../test/throw-when-called'

describe(relativePath(__filename), () => {
	describe('Success(value)', () => {
		it('should be a function', () => {
			expect(Success).to.be.a.function()
		})

		it('should create an object', () => {
			const id = x => x
			const inc = x => x + 1
			const incSuccess = x => Success(x + 1)
			const incFailure = x => Failure(x + 1)

			// Fork

			expect(
				Success(5)
				.fork(throwWhenCalled, id)
			).to.eql(5)
			
			// Map

			expect(
				Success(5).map(inc)
				.fork(throwWhenCalled, id)
			).to.eql(6)
			
			expect(
				Success(5).mapLeft(inc)
				.fork(throwWhenCalled, id)
			).to.eql(5)
			
			expect(
				Success(5).mapBoth(throwWhenCalled, inc)
				.fork(throwWhenCalled, id)
			).to.eql(6)
			
			// Chain into Failure

			expect(
				Success(5).chain(incFailure)
				.fork(id, throwWhenCalled)
			).to.eql(6)
			
			expect(
				Success(5).chainLeft(incFailure)
				.fork(throwWhenCalled, id)
			).to.eql(5)
			
			expect(
				Success(5).chainBoth(throwWhenCalled, incFailure)
				.fork(id, throwWhenCalled)
			).to.eql(6)

			// Chain into Success
			
			expect(
				Success(5).chain(incSuccess)
				.fork(throwWhenCalled, id)
			).to.eql(6)
			
			expect(
				Success(5).chainLeft(incSuccess)
				.fork(throwWhenCalled, id)
			).to.eql(5)
			
			expect(
				Success(5).chainBoth(throwWhenCalled, incSuccess)
				.fork(throwWhenCalled, id)
			).to.eql(6)

		})
	})
})
