import { RecordFactory, StaticallyTypedRecord } from '../utils/immutable_helper';
import { Map as iMap, List as iList } from 'immutable';

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

interface IPoint {
	x: number;
	y: number;
}

export const point = RecordFactory<IPoint>({
	x: 0,
	y: 0
});

export class Point extends point implements IPoint, StaticallyTypedRecord<IPoint> {
	x: number;
	y: number;
	constructor(props: IPoint) {
		super(props);
	}
}

export enum PonyName {
	TWILIGHT_SPARKLE = 'Twilight Sparkle',
	APPLEJACK = 'Applejack',
	FLUTTERSHY = 'Fluttershy',
	RARITY = 'Rarity',
	PINKIE_PIE = 'Pinkie Pie',
	RAINBOW_DASH = 'Rainbow Dash'
}

export enum Direction {
	WEST = 'west',
	EAST = 'east',
	NORTH = 'north',
	SOUTH = 'south'
}

export type CharactersPosition = iMap<Role, Point>;

// sides is bitwise OR of sides
interface IBlueprintRecord {
	sides: number;
}

const blueprintRecord = RecordFactory<IBlueprintRecord>({
	sides: 0
});

export class BlueprintRecord extends blueprintRecord
	implements IBlueprintRecord, StaticallyTypedRecord<IBlueprintRecord> {
	sides: number;
	constructor(props: IBlueprintRecord) {
		super(props);
	}
}

export type Blueprint = iList<iList<BlueprintRecord>>;

interface IGameState {
	mazeId: string;
	width: number;
	height: number;
	charactersPosition: CharactersPosition;
	blueprint: Blueprint;
}

const gameState = RecordFactory<IGameState>({
	mazeId: '',
	width: 0,
	height: 0,
	charactersPosition: iMap<Role, Point>(),
	blueprint: iList<iList<BlueprintRecord>>()
});

export class GameState extends gameState implements IGameState, StaticallyTypedRecord<IGameState> {
	mazeId: string;
	width: number;
	height: number;
	charactersPosition: CharactersPosition;
	blueprint: Blueprint;
	constructor(props: IGameState) {
		super(props);
	}
}

export type Position = [number];
export interface APIState {
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

export enum RainbowType {
	NORTH_TO_EAST = 'NORTH_TO_EAST',
	EAST_TO_SOUTH = 'EAST_TO_SOUTH',
	SOUTH_TO_WEST = 'SOUTH_TO_WEST',
	WEST_TO_NORTH = 'WEST_TO_NORTH',
	NORTH_RED_TO_LEFT = 'NORTH_RED_TO_LEFT',
	NORTH_RED_TO_RIHGT = 'NORTH_RED_TO_RIGHT',
	WEST_RED_TO_TOP = 'WEST_RED_TO_TOP',
	WEST_RED_TO_BOTTOM = 'WEST_RED_TO_BOTTOM',
	NONE = 'NONE'
}
export type RainbowPosition = { x: number; y: number; direction: Direction };
export type RainbowPath = [] | [RainbowPosition] | [RainbowPosition, RainbowPosition];

export enum BorderConnection {
	TOP_LEFT = 1,
	TOP_RIGHT = 2,
	BOTTOM_LEFT = 4,
	BOTTOM_RIGHT = 8
}
