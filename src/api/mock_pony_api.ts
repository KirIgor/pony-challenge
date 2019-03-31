import { PonyName, Direction } from '../types';
import { get } from '../utils/fetcher';

const MockPonyApi = {
	newGame: (width: number, height: number, playerName: PonyName, difficulty: number) =>
		get('/mockapi/id.json'),

	getState: (mazeId: string) => get('/mockapi/state.json'),

	makeMove: (direction: Direction) => {
		throw Error("Can't make move while mocking api");
	}
};

export default MockPonyApi;
