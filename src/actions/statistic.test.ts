import { addWins, addLoses } from './statistic';

describe('statistic action creators', () => {
	describe('addWins action creator', () => {
		it('should dispatch correct action', () => {
			expect(addWins()).toMatchSnapshot();
		});
	});

	describe('addLoses action creator', () => {
		it('should dispatch correct action', () => {
			expect(addLoses()).toMatchSnapshot();
		});
	});
});
