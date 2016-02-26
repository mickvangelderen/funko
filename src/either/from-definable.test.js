/* eslint-env mocha */
import expect from 'must'
import fromDefinable from './from-definable'
import identity from '../identity'
import relativePath from '../../test/relative-path'
import Spy from '../../test/spy'
import throwWhenCalled from '../../test/throw-when-called'

describe(relativePath(__filename), () => {
	describe('fromDefinable', () => {
		it('should be a function', () => {
			expect(fromDefinable).to.be.a.function()
		})

		it('should create Failure from NaN', () => {
			const spy = Spy(identity)
			fromDefinable(NaN).fork(throwWhenCalled, spy)
			fromDefinable(undefined).fork(spy, throwWhenCalled)
			fromDefinable(null).fork(throwWhenCalled, spy)
			fromDefinable(false).fork(throwWhenCalled, spy)
			expect(spy.calls).to.eql([
				[ NaN ],
				[ undefined ],
				[ null ],
				[ false ]
			])
		})
	})
})
