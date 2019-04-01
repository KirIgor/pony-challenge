import { Direction, APIState, PonyName } from '../types';

export interface NewGameResponse {
	maze_id: string;
}

export interface PonyAPI {
	newGame: (
		width: number,
		height: number,
		playerName: PonyName,
		difficulty: number
	) => Promise<NewGameResponse>;
	getState: (mazeId: string) => Promise<APIState>;
	makeMove: (mazeId: string, direction: Direction) => Promise<APIState>;
}
