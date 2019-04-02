import { Direction, APIState, PonyName } from '../types/index';

export interface NewGameResponse {
	maze_id: string;
}

export interface MakeMoveResponse {
	state: string;
	'state-result': string;
}

export interface PonyAPI {
	newGame: (
		width: number,
		height: number,
		playerName: PonyName,
		difficulty: number
	) => Promise<NewGameResponse>;
	getState: (mazeId: string) => Promise<APIState>;
	makeMove: (mazeId: string, direction: Direction) => Promise<MakeMoveResponse>;
}
