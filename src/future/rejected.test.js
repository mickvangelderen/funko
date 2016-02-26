/* eslint-env mocha */
import expect from 'must'
import identity from '../identity'
import rejected from './rejected'
import relativePath from '../../test/relative-path'
import Spy from '../../test/spy'
import throwWhenCalled from '../../test/throw-when-called'

describe(relativePath(__filename), () => {
	describe('rejected(value)', () => {
		it('should be a function', () => {
			expect(rejected).to.be.a.function()
		})

		it('should create rejected futures', () => {
			const spy = Spy(identity)
			rejected(69).fork(spy, throwWhenCalled)
			expect(spy.calls).to.eql([ [ 69 ] ])
		})
	})
})
