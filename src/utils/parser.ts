import {
	GameState,
	APIState,
	Blueprint,
	CharactersPosition,
	Direction,
	Side,
	Position,
	Role,
	Point
} from '../types';
import { fromJS } from 'immutable';

import { range } from './helper';
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

export const parseBlueprint = (data: string[][], [width, height]: [number, number]): Blueprint =>
	fromJS(
		range(height).map(i =>
			data.slice(i * width, i * width + width).map((directions, j) => ({
				sides: directions
					.map(direction => directionToSide(Direction[direction.toUpperCase()]))
					.reduce(
						(acc, cur) => (acc |= cur),
						(+(i === height - 1) * Side.BOTTOM) | (+(j === width - 1) * Side.RIGHT)
					)
			}))
		)
	);

const parsePosition = (pos: Position, width: number): Point =>
	new Point({
		x: pos[0] % width,
		y: Math.floor(pos[0] / width)
	});

export const parseCharactersPosition = (
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

export const parseGameState = (state: APIState): GameState =>
	new GameState({
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
