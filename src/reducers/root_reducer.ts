import { combineReducers, Reducer } from 'redux';

import { StoreState, StoreAction } from '../store/store';
import gameReducer from './game';
import statisticReducer from './statistic';
import musicReducer from './music';

const rootReducer: Reducer<StoreState, StoreAction> = combineReducers({
	game: gameReducer,
	statistic: statisticReducer,
	music: musicReducer
});

export default rootReducer;
