import { PonyName, Direction, APIState } from '../types';
import { PonyAPI } from './pony_api';

import * as newGameResponse from './mockapi/id.json';
import * as getStateResponse from './mockapi/state.json';
import * as moveResponse from './mockapi/move.json';

const MockPonyApi: PonyAPI = {
	newGame: (width: number, height: number, playerName: PonyName, difficulty: number) =>
		Promise.resolve(newGameResponse),

	getState: (mazeId: string) => Promise.resolve(getStateResponse as APIState),

	makeMove: (direction: Direction) => Promise.resolve(moveResponse)
};

export default MockPonyApi;
