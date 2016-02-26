/* eslint-env mocha */
import expect from 'must'
import fromBoolean from './from-boolean'
import identity from '../identity'
import relativePath from '../../test/relative-path'
import Spy from '../../test/spy'
import throwWhenCalled from '../../test/throw-when-called'

describe(relativePath(__filename), () => {
	describe('fromBoolean', () => {
		it('should be a function', () => {
			expect(fromBoolean).to.be.a.function()
		})

		it('should create Failure from NaN', () => {
			const spy = Spy(identity)
			fromBoolean(NaN).fork(throwWhenCalled, spy)
			fromBoolean(undefined).fork(throwWhenCalled, spy)
			fromBoolean(null).fork(throwWhenCalled, spy)
			fromBoolean(false).fork(spy, throwWhenCalled)
			expect(spy.calls).to.eql([
				[ NaN ],
				[ undefined ],
				[ null ],
				[ false ]
			])
		})
	})
})
