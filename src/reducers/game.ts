import { Map as iMap, List as iList } from 'immutable';

import { GameState, BlueprintRecord, Role, Point, GameStatus } from '../types/index';
import { GameAction, UPDATE_STATE, INIT_STATE } from '../actions/game';

export const defaultGameState = new GameState({
	mazeId: '',
	width: 0,
	height: 0,
	gameStatus: GameStatus.ACTIVE,
	charactersPosition: iMap<Role, Point>(),
	blueprint: iList<iList<BlueprintRecord>>()
});

const gameReducer = (state: GameState = defaultGameState, action: GameAction): GameState => {
	switch (action.type) {
		case INIT_STATE: {
			const { state } = action.payload;

			return state;
		}
		case UPDATE_STATE: {
			const { charactersPosition, gameStatus } = action.payload;

			return state.withMutations(state =>
				state.set('charactersPosition', charactersPosition).set('gameStatus', gameStatus)
			) as GameState;
		}
		default:
			return state;
	}
};

export default gameReducer;
