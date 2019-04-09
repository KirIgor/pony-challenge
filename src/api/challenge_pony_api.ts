import { PonyName, Direction, APIState } from '../types/index';
import { PonyAPI, NewGameResponse, MakeMoveResponse } from './pony_api';
import { get, post } from '../utils/fetcher';

const baseURL = 'https://ponychallenge.trustpilot.com/pony-challenge';

const ChallengePonyAPI: PonyAPI = {
	newGame: (width: number, height: number, playerName: PonyName, difficulty: number) =>
		post(`${baseURL}/maze`, {
			'maze-width': width,
			'maze-height': height,
			'maze-player-name': playerName,
			difficulty: difficulty
		}) as Promise<NewGameResponse>,

	getState: (mazeId: string) => get(`${baseURL}/maze/${mazeId}`) as Promise<APIState>,

	makeMove: (mazeId: string, direction: Direction) =>
		post(`${baseURL}/maze/${mazeId}`, { direction: direction.toString() }) as Promise<
			MakeMoveResponse
		>
};

export default ChallengePonyAPI;
