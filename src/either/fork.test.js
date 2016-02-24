/* eslint-env mocha */
import expect from 'must'
import fork from './fork'
import relativePath from '../../test/relative-path'

describe(relativePath(__filename), () => {
	describe('fork(func, resolvable)', () => {
		it('should be a function', () => {
			expect(fork).to.be.a.function()
		})

		it('should call fork on forkable', () => {
			const just = value => () => value
			const f = fork(just('rejected'), just('resolved'))
			expect(f({ fork: reject => reject(42) })).to.eql('rejected')
			expect(f({ fork: (reject, resolve) => resolve(42) })).to.eql('resolved')
		})
	})
})
