import { Map as iMap, List as iList } from 'immutable';

import { GameState, BlueprintRecord, Role, Point } from '../types/index';
import { GameAction, UPDATE_CHARACTERS_POSITION, INIT_STATE } from '../actions/game';

const defaultGameState = new GameState({
	mazeId: '',
	width: 0,
	height: 0,
	charactersPosition: iMap<Role, Point>(),
	blueprint: iList<iList<BlueprintRecord>>()
});

const gameReducer = (state: GameState = defaultGameState, action: GameAction) => {
	switch (action.type) {
		case INIT_STATE: {
			const { state } = action.payload;

			return state;
		}
		case UPDATE_CHARACTERS_POSITION: {
			const { charactersPosition } = action.payload;

			return state.set('charactersPosition', charactersPosition);
		}
		default:
			return state;
	}
};

export default gameReducer;
