import { Dispatch } from 'redux';

import { Direction, GameState, CharactersPosition, PonyName } from '../types/index';
import { StoreState } from '../store/store';
import { ponyAPI } from '../App';
import { parseCharactersPosition, parseGameState } from '../utils/parser';

// action types
export const UPDATE_CHARACTERS_POSITION = 'UPDATE_CHARACTERS_POSITION';
export type UPDATE_CHARACTERS_POSITION = typeof UPDATE_CHARACTERS_POSITION;

export const INIT_STATE = 'INIT_STATE';
export type INIT_STATE = typeof INIT_STATE;

// actions

export interface MoveAction {
	type: UPDATE_CHARACTERS_POSITION;
	payload: { charactersPosition: CharactersPosition };
}

export interface InitAction {
	type: INIT_STATE;
	payload: { state: GameState };
}

export type GameAction = MoveAction | InitAction;

// action creators

export const move = (direction: Direction) => async (
	dispatch: Dispatch<MoveAction>,
	getState: () => StoreState
) => {
	const mazeId = getState().game.get('mazeId');
	if (mazeId == '') throw Error('initialize game first');

	await ponyAPI.makeMove(mazeId, direction);
	const apiState = await ponyAPI.getState(mazeId);

	dispatch({
		type: UPDATE_CHARACTERS_POSITION,
		payload: { charactersPosition: parseCharactersPosition(apiState) }
	});
};

export const init = (
	width: number,
	height: number,
	playerName: PonyName,
	difficulty: number
) => async (dispatch: Dispatch<InitAction>, getState: () => StoreState) => {
	const { maze_id: mazeId } = await ponyAPI.newGame(width, height, playerName, difficulty);
	const apiState = await ponyAPI.getState(mazeId);

	dispatch({
		type: INIT_STATE,
		payload: { state: parseGameState(apiState) }
	});
};
