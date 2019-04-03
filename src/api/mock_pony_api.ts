import { PonyName, Direction, APIState } from '../types';
import { PonyAPI } from './pony_api';

import * as newGameResponse from '../../assets/mockapi/id.json';
import * as getStateResponse from '../../assets/mockapi/state.json';
import * as moveResponse from '../../assets/mockapi/move.json';

const MockPonyApi: PonyAPI = {
	newGame: (width: number, height: number, playerName: PonyName, difficulty: number) =>
		Promise.resolve(newGameResponse),

	getState: (mazeId: string) => Promise.resolve(getStateResponse as APIState),

	makeMove: (direction: Direction) => Promise.resolve(moveResponse)
};

export default MockPonyApi;
