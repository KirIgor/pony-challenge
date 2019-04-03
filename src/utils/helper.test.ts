import { range } from './helper';

describe('helper', () => {
	describe('range', () => {
		it('should return empty array if arg is negative or 0', () => {
			expect(range(-10)).toEqual([]);
			expect(range(0)).toEqual([]);
		});

		it('should return correct results', () => {
			expect(range(3)).toEqual([0, 1, 2]);
			expect(range(5)).toEqual([0, 1, 2, 3, 4]);
			expect(range(7)).toEqual([0, 1, 2, 3, 4, 5, 6]);
		});
	});
});
