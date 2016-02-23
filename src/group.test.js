/* eslint-env mocha */
import group from './group'
import expect from 'must'
import relativePath from '../test/relative-path'

describe(relativePath(__filename), () => {
	describe('group(toKey, list)', () => {
		it('should be a function', () => {
			expect(group).to.be.a.function()
		})
		
		let list = null
		let result = null
		let toKey = null

		beforeEach(() => {
			list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
			
			result = {
				bad: [ 1, 2, 3, 4, 5 ],
				good: [ 6, 7, 8 ],
				great: [ 9, 10 ]
			}

			toKey = i => {
				if (i < 6) return 'bad'
				if (i < 9) return 'good'
				return 'great'
			}
		})
		
		it('should group items from a list by keys returned by the passed function', () => {
			expect(group(toKey, list)).to.eql(result)
		})

		it('should be curried', () => {
			const g = group(toKey)
			expect(g).to.be.a.function()
			expect(g(list)).to.eql(result)
		})
	})
})
