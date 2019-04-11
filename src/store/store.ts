import { createStore, applyMiddleware, compose, Action } from 'redux';
import thunk from 'redux-thunk';

import { GameState, StatistcState, MusicState } from '../types/index';
import { GameAction } from '../actions/game';
import { StatisticAction } from '../actions/statistic';
import { MusicAction } from '../actions/music';
import rootReducer from '../reducers/root_reducer';

export interface StoreState {
	game: GameState;
	statistic: StatistcState;
	music: MusicState;
}

export type StoreAction = Action<GameAction | StatisticAction | MusicAction>;

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const newStore = () => {
	return createStore<StoreState, StoreAction, {}, {}>(
		rootReducer,
		composeEnhancers(applyMiddleware(thunk))
	);
};
