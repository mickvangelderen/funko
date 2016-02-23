/* eslint-env mocha */
import expect from 'must'
import rawCurry from './raw-curry'
import relativePath from '../../test/relative-path'

describe(relativePath(__filename), () => {
	it('should rawCurry functions', () => {
		const f = rawCurry(3, (...args) => {
			expect(args).to.eql([3, 4, 5])
			return args[0] + args[1]*args[2]
		})
		// Single part
		expect(f(3, 4, 5)).to.equal(23)
		// Two parts
		expect(f(3, 4)(5)).to.equal(23)
		expect(f(3)(4, 5)).to.equal(23)
		expect(f()(3, 4, 5)).to.equal(23)
		// Three parts
		expect(f(3)(4)(5)).to.equal(23)
	})
})
