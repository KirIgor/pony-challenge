import { range, parseQuery } from './helper';

describe('helper', () => {
	describe('range', () => {
		it('should return empty array if arg is negative or 0', () => {
			expect(range(-10)).toEqual([]);
			expect(range(0)).toEqual([]);
		});

		it('should return correct results', () => {
			expect(range(5)).toEqual([0, 1, 2, 3, 4]);
		});
	});

	describe('parseQuery', () => {
		it('should return correct result', () => {
			expect(parseQuery('?test1=test1&test2=test2&test3=test3')).toEqual({
				test1: 'test1',
				test2: 'test2',
				test3: 'test3'
			});
		});
	});
});
