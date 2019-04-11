import { toggleMusic } from './music';

describe('music action creators', () => {
	describe('toggle action creator', () => {
		it('should dispatch correct action', () => {
			expect(toggleMusic()).toMatchSnapshot();
		});
	});
});
