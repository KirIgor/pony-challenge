import {
	MazeProps,
	GameState,
	Blueprint,
	CharactersPosition,
	Direction,
	Side,
	Position,
	Role,
	Point
} from '../types';

import { range } from '../utils/helper';
import { Map as iMap } from 'immutable';

const directionToSide = (direction: Direction): Side => {
	switch (direction) {
		case Direction.WEST: {
			return Side.LEFT;
		}
		case Direction.EAST: {
			return Side.RIGHT;
		}
		case Direction.NORTH: {
			return Side.TOP;
		}
		case Direction.SOUTH: {
			return Side.BOTTOM;
		}
	}
};

const parseBlueprint = (data: string[][], [width, height]: [number, number]): Blueprint =>
	range(height).map(i =>
		data.slice(i * width, i * width + width).map(directions => ({
			sides: directions
				.map(direction => directionToSide(Direction[direction.toUpperCase()]))
				.reduce((acc, cur) => (acc |= cur), 0)
		}))
	);

const parsePosition = (pos: Position, width: number): Point => ({
	x: pos[0] % width,
	y: Math.floor(pos[0] / width)
});

const parseCharactersPosition = (
	[width, height]: [number, number],
	pony: Position,
	domokun: Position,
	exit: Position
): CharactersPosition =>
	iMap<Role, Point>().withMutations(map =>
		map
			.set(Role.PONY, parsePosition(pony, width))
			.set(Role.DOMOKUN, parsePosition(domokun, width))
			.set(Role.EXIT, parsePosition(exit, width))
	);

export const parseGameState = (state: GameState): MazeProps => ({
	width: state.size[0],
	height: state.size[1],
	charactersPosition: parseCharactersPosition(
		state.size,
		state.pony,
		state.domokun,
		state['end-point']
	),
	blueprint: parseBlueprint(state.data, state.size)
});
