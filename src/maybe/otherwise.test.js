/* eslint-env mocha */
import expect from 'must'
import otherwise from './otherwise'
import relativePath from '../../test/relative-path'

describe(relativePath(__filename), () => {
	describe('otherwise(func, resolvable)', () => {
		it('should be a function', () => {
			expect(otherwise).to.be.a.function()
		})

		it('should call otherwise on otherwisable', () => {
			const f = otherwise('otherwised')
			expect(f({ otherwise: value => value })).to.eql('otherwised')
			expect(f({ otherwise: () => 42 })).to.eql(42)
		})
	})
})
