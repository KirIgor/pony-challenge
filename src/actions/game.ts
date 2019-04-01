import { Direction } from '../types';
import { ponyAPI } from '../App';
import { parseCharactersPosition, parseGameState } from '../utils/parser';
import { Dispatch } from 'redux';
import { GameState, CharactersPosition, PonyName } from '../types';

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

export const move = (mazeId: string, direction: Direction) => async (
	dispatch: Dispatch<MoveAction>,
	getState: () => GameState
) => {
	const apiState = await ponyAPI.makeMove(mazeId, direction);

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
) => async (dispatch: Dispatch<InitAction>, getState: () => GameState) => {
	const { maze_id: mazeId } = await ponyAPI.newGame(width, height, playerName, difficulty);
	const apiState = await ponyAPI.getState(mazeId);

	dispatch({
		type: INIT_STATE,
		payload: { state: parseGameState(apiState) }
	});
};
