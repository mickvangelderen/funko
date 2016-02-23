/* eslint-env mocha */
import expect from 'must'
import rawPartial from './raw-partial'
import relativePath from '../../test/relative-path'

describe(relativePath(__filename), () => {
	it('should return the same function when applying 0 arguments', () => {
		const f = (a, b, c) => a + b*c
		expect(rawPartial([], f)).to.equal(f)
	})
	it('should rawPartially apply arguments', () => {
		const f = (...args) => expect(args).to.eql([3, 4, 5])
		rawPartial([], f)(3, 4, 5)
		rawPartial([3], f)(4, 5)
		rawPartial([3, 4], f)(5)
		rawPartial([3, 4, 5], f)()
	})
})
