export enum PonyName {
	TWILIGHT_SPARKLE = 'Twilight Sparkle',
	APPLEJACK = 'Applejack',
	FLUTTERSHY = 'Fluttershy',
	RARITY = 'Rarity',
	PINKIE_PIE = 'Pinkie Pie',
	RAINBOW_DASH = 'Rainbow Dash',
	SPIKE = 'Spike'
}

export enum Direction {
	WEST = 'west',
	EAST = 'east',
	NORTH = 'north',
	SOUTH = 'south'
}

type Id = string;
type Position = [number];

export interface GameState {
	pony: Position;
	domokun: Position;
	'end-point': Position;
	size: [number, number];
	difficulty: number;
	data: string[][];
	maze_id: string;
	'game-state': {
		state: string;
		'state-result': string;
	};
}

export interface PonyAPI {
	newGame: (width: number, height: number, playerName: PonyName, difficulty: number) => Promise<Id>;
	getState: (mazeId: string) => Promise<GameState>;
	makeMove: (direction: Direction) => Promise<GameState>;
}
