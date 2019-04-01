import { Direction, APIState, PonyName } from '../types';

type Id = string;

export interface PonyAPI {
	newGame: (width: number, height: number, playerName: PonyName, difficulty: number) => Promise<Id>;
	getState: (mazeId: string) => Promise<APIState>;
	makeMove: (direction: Direction) => Promise<APIState>;
}
