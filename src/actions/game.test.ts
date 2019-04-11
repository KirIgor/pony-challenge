import { PonyName, Direction, GameState } from '../types/index';
import { StoreState } from '../store/store';
import { defaultGameState } from '../reducers/game';
import { defaultStatisticState } from '../reducers/statistic';
import { defaultMusicState } from '../reducers/music';
import { init, move } from './game';

jest.mock('../App');

const getState: () => StoreState = () => ({
	game: defaultGameState,
	statistic: defaultStatisticState,
	music: defaultMusicState
});

describe('game action creators', () => {
	describe('init action creator', () => {
		it('should dispatch correct action', async () => {
			const dispatchResults: any = [];
			const dispatch = jest.fn(x => dispatchResults.push(x));

			await init(15, 15, PonyName.APPLEJACK, 0)(dispatch, getState);

			expect(dispatch.mock.calls.length).toBe(1);
			expect(dispatchResults[0]).toMatchSnapshot();
		});
	});

	describe('move action creator', () => {
		it('should dispatch correct action', async () => {
			const dispatchResults: any = [];
			const dispatch = jest.fn(x => dispatchResults.push(x));

			const state = {
				game: defaultGameState,
				statistic: defaultStatisticState,
				music: defaultMusicState
			};
			state.game = state.game.set('mazeId', 'test-id') as GameState;
			const getState: () => StoreState = () => state;

			await move(Direction.EAST)(dispatch, getState);

			expect(dispatch.mock.calls.length).toBe(1);
			expect(dispatchResults[0]).toMatchSnapshot();
		});
	});
});
