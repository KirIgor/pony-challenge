import * as React from 'react';

import { Role, CharactersPosition, GameState, Blueprint } from '../../types/index';
import { range } from '../../utils/helper';

import MazeCeil from './maze_ceil';

import './maze.css';

interface Props {
	gameState: GameState;
}

const renderCeils = (
	width: number,
	height: number,
	charactersPosition: CharactersPosition,
	blueprint: Blueprint
) => {
	return range(width).map(i => (
		<Row>
			{range(height).map(j => (
				<MazeCeil
					key={j}
					sides={blueprint.getIn([i, j, 'sides'])}
					role={getRole(charactersPosition, i, j)}
				/>
			))}
		</Row>
	));
};

function Row({ children }: { children: JSX.Element[] }) {
	return <div className="row">{children}</div>;
}

export default function Maze({
	gameState: { width, height, charactersPosition, blueprint }
}: Props) {
	return <div>{renderCeils(width, height, charactersPosition, blueprint)}</div>;
}

const getRole = (charactersPosition: CharactersPosition, i: number, j: number): Role => {
	return charactersPosition.findKey(point => point.x == i && point.y == j) || Role.NONE;
};
