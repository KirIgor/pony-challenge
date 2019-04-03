import { createStore, applyMiddleware, compose, Action } from 'redux';
import thunk from 'redux-thunk';

import { GameState } from '../types/index';
import { GameAction } from '../actions/game';
import rootReducer from '../reducers/root_reducer';

export interface StoreState {
	game: GameState;
}

export type StoreAction = Action<GameAction>;

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const newStore = () => {
	return createStore<StoreState, StoreAction, {}, {}>(
		rootReducer,
		composeEnhancers(applyMiddleware(thunk))
	);
};
