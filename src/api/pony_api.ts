import { Direction, GameState, PonyName } from '../types';

type Id = string;

export interface PonyAPI {
	newGame: (width: number, height: number, playerName: PonyName, difficulty: number) => Promise<Id>;
	getState: (mazeId: string) => Promise<GameState>;
	makeMove: (direction: Direction) => Promise<GameState>;
}
