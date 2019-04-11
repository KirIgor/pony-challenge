import { StatistcState } from '../types/index';
import { StatisticAction, ADD_WINS, ADD_LOSES } from '../actions/statistic';

export const defaultStatisticState = new StatistcState({
	wins: 0,
	loses: 0
});

const statistcReducer = (
	state: StatistcState = defaultStatisticState,
	action: StatisticAction
): StatistcState => {
	switch (action.type) {
		case ADD_WINS: {
			return state.update('wins', wins => wins + 1) as StatistcState;
		}
		case ADD_LOSES: {
			return state.update('loses', loses => loses + 1) as StatistcState;
		}
		default:
			return state;
	}
};

export default statistcReducer;
