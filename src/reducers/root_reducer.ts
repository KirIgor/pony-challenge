import { combineReducers, Reducer } from 'redux';

import { StoreState, StoreAction } from '../store/store';
import gameReducer from './game';

const rootReducer: Reducer<StoreState, StoreAction> = combineReducers({
	game: gameReducer
});

export default rootReducer;
