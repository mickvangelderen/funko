/* eslint-env mocha */
import expect from 'must'
import fromNumber from './from-number'
import identity from '../identity'
import relativePath from '../../test/relative-path'
import Spy from '../../test/spy'
import throwWhenCalled from '../../test/throw-when-called'

describe(relativePath(__filename), () => {
	describe('fromNumber', () => {
		it('should be a function', () => {
			expect(fromNumber).to.be.a.function()
		})

		it('should create Failure from NaN', () => {
			const spy = Spy(identity)
			fromNumber(NaN).fork(spy, throwWhenCalled)
			fromNumber(undefined).fork(throwWhenCalled, spy)
			fromNumber(null).fork(throwWhenCalled, spy)
			fromNumber(false).fork(throwWhenCalled, spy)
			expect(spy.calls).to.eql([
				[ NaN ],
				[ undefined ],
				[ null ],
				[ false ]
			])
		})
	})
})
