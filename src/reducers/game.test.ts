import { Map as iMap, List as iList } from 'immutable';

import { GameAction, INIT_STATE, UPDATE_STATE } from '../actions/game';
import { GameState, BlueprintRecord, Role, Point, GameStatus } from '../types/index';
import gameReducer, { defaultGameState } from './game';

describe('game reducer', () => {
	it('should return default game state when passing state equals undefined and action equals {}', () => {
		const newState = gameReducer(undefined, {} as GameAction);

		expect(newState).toEqual(defaultGameState);
	});

	it('should replace state on INIT_STATE', () => {
		const testState = new GameState({
			mazeId: 'new maze id',
			width: 1,
			height: 2,
			gameStatus: GameStatus.ACTIVE,
			charactersPosition: iMap<Role, Point>().set(Role.EXIT, new Point({ x: 1, y: 1 })),
			blueprint: iList<iList<BlueprintRecord>>().setIn([0, 0], new BlueprintRecord({ sides: 1 }))
		});

		const newState = gameReducer(defaultGameState, {
			type: INIT_STATE,
			payload: { state: testState }
		});

		expect(newState).toEqual(testState);
	});

	it('should change nothing except characters position on UPDATE_CHARACTERS_POSITION', () => {
		const testCharactersPosition = iMap<Role, Point>().set(Role.EXIT, new Point({ x: 0, y: 10 }));

		const newState = gameReducer(defaultGameState, {
			type: UPDATE_STATE,
			payload: { charactersPosition: testCharactersPosition, gameStatus: GameStatus.ACTIVE }
		});

		const defaultGameStateObject = defaultGameState as object;
		Object.entries(newState.toObject()).forEach(([key, value]) => {
			if (key == 'charactersPosition') expect(value).not.toEqual(defaultGameStateObject[key]);
			else expect(value).toEqual(defaultGameStateObject[key]);
		});
	});
});
