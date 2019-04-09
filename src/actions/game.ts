import { Dispatch, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { Direction, GameState, CharactersPosition, PonyName, GameStatus } from '../types/index';
import { StoreState } from '../store/store';
import { ponyAPI } from '../App';
import { parseCharactersPosition, parseGameState, parseGameStatus } from '../utils/parser';

// action types
export const UPDATE_STATE = 'UPDATE_STATE';
export type UPDATE_STATE = typeof UPDATE_STATE;

export const INIT_STATE = 'INIT_STATE';
export type INIT_STATE = typeof INIT_STATE;

// actions

export interface MoveAction {
	type: UPDATE_STATE;
	payload: { charactersPosition: CharactersPosition; gameStatus: GameStatus };
}

export interface InitAction {
	type: INIT_STATE;
	payload: { state: GameState };
}

export type GameAction = MoveAction | InitAction;

// action creators

export const move: ActionCreator<ThunkAction<Promise<void>, StoreState, void, InitAction>> = (
	direction: Direction
) => async (dispatch: Dispatch<MoveAction>, getState: () => StoreState) => {
	const mazeId = getState().game.get('mazeId');
	if (mazeId == '') throw Error('initialize game first');

	await ponyAPI.makeMove(mazeId, direction);
	const apiState = await ponyAPI.getState(mazeId);

	dispatch({
		type: UPDATE_STATE,
		payload: {
			charactersPosition: parseCharactersPosition(apiState),
			gameStatus: parseGameStatus(apiState)
		}
	});
};

export const init: ActionCreator<ThunkAction<Promise<void>, StoreState, void, InitAction>> = (
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
