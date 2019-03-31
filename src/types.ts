import { Map as iMap } from 'immutable';

export enum Role {
	PONY = 'pony',
	DOMOKUN = 'domokun',
	EXIT = 'exit',
	NONE = 'none'
}

export enum Side {
	LEFT = 1,
	RIGHT = 2,
	TOP = 4,
	BOTTOM = 8
}

export interface Point {
	x: number;
	y: number;
}

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

export type CharactersPosition = iMap<Role, Point>;

// sides is bitwise OR of sides
export interface Blueprint {
	[index: number]: {
		[index: number]: {
			sides: number;
		};
	};
}

export interface MazeProps {
	width: number;
	height: number;
	charactersPosition: CharactersPosition;
	blueprint: Blueprint;
}

export type Position = [number];
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
