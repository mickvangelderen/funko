/* eslint-env mocha */
import expect from 'must'
import identity from '../identity'
import resolved from './resolved'
import relativePath from '../../test/relative-path'
import Spy from '../../test/spy'
import throwWhenCalled from '../../test/throw-when-called'

describe(relativePath(__filename), () => {
	describe('resolved(value)', () => {
		it('should be a function', () => {
			expect(resolved).to.be.a.function()
		})

		it('should create resolved futures', () => {
			const spy = Spy(identity)
			resolved(42).fork(throwWhenCalled, spy)
			expect(spy.calls).to.eql([ [ 42 ] ])
		})
	})
})
