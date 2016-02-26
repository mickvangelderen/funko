/* eslint-env mocha */
import expect from 'must'
import fromNullable from './from-nullable'
import identity from '../identity'
import relativePath from '../../test/relative-path'
import Spy from '../../test/spy'
import throwWhenCalled from '../../test/throw-when-called'

describe(relativePath(__filename), () => {
	describe('fromNullable', () => {
		it('should be a function', () => {
			expect(fromNullable).to.be.a.function()
		})

		it('should create Failure from NaN', () => {
			const spy = Spy(identity)
			fromNullable(NaN).fork(throwWhenCalled, spy)
			fromNullable(undefined).fork(throwWhenCalled, spy)
			fromNullable(null).fork(spy, throwWhenCalled)
			fromNullable(false).fork(throwWhenCalled, spy)
			expect(spy.calls).to.eql([
				[ NaN ],
				[ undefined ],
				[ null ],
				[ false ]
			])
		})
	})
})
