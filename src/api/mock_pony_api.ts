import { PonyName, Direction, APIState } from '../types';
import { PonyAPI, NewGameResponse } from './pony_api';
import { get } from '../utils/fetcher';

const MockPonyApi: PonyAPI = {
	newGame: (width: number, height: number, playerName: PonyName, difficulty: number) =>
		get('/mockapi/id.json') as Promise<NewGameResponse>,

	getState: (mazeId: string) => get('/mockapi/state.json') as Promise<APIState>,

	makeMove: (direction: Direction) => {
		throw Error("Can't make move while mocking api");
	}
};

export default MockPonyApi;
