/* eslint-env mocha */
import curry from './curry'
import expect from 'must'
import relativePath from '../test/relative-path'
import { _curry } from './curry'
import { _partial } from './curry'

describe(relativePath(__filename), () => {
	describe('_partial(argu, func)', () => {
		it('should return the same function when applying 0 arguments', () => {
			const f = (a, b, c) => a + b*c
			expect(_partial([], f)).to.equal(f)
		})
		it('should _partially apply arguments', () => {
			const f = (...args) => expect(args).to.eql([3, 4, 5])
			_partial([], f)(3, 4, 5)
			_partial([3], f)(4, 5)
			_partial([3, 4], f)(5)
			_partial([3, 4, 5], f)()
		})
	})

	describe('_curry(arity, func)', () => {
		it('should _curry functions', () => {
			const f = _curry(3, (...args) => {
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

	describe('curry(arity, func)', () => {
		it('should be curried', () => {
			const curry3 = curry(3)
			const f = curry3((...args) => {
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
})
