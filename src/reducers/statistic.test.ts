import statistcReducer, { defaultStatisticState } from './statistic';
import { addWins, addLoses } from '../actions/statistic';

describe('statistic reducer', () => {
	it('should add wins on ADD_WINS action', () => {
		const newState = statistcReducer(defaultStatisticState, addWins());

		expect(newState.wins).toBe(defaultStatisticState.wins + 1);
	});

	it('should add loses on ADD_LOSES action', () => {
		const newState = statistcReducer(defaultStatisticState, addLoses());

		expect(newState.loses).toBe(defaultStatisticState.loses + 1);
	});
});
