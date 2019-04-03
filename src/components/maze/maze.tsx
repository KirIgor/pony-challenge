import * as React from 'react';

import { Role, CharactersPosition, GameState, Blueprint, PonyName } from '../../types/index';
import { range } from '../../utils/helper';

import MazeCeil from './maze_ceil';

import './maze.css';

interface Props {
	ponyName: PonyName;
	gameState: GameState;
}

const renderCeils = (
	width: number,
	height: number,
	ponyName: PonyName,
	charactersPosition: CharactersPosition,
	blueprint: Blueprint
) => {
	return range(height).map(i => (
		<Row key={i}>
			{range(width).map(j => (
				<MazeCeil
					key={j}
					sides={blueprint.getIn([i, j, 'sides'])}
					role={getRole(charactersPosition, i, j)}
					ponyName={ponyName}
				/>
			))}
		</Row>
	));
};

function Row({ children }: { children: JSX.Element[] }) {
	return <div className="row">{children}</div>;
}

export default function Maze({
	ponyName,
	gameState: { width, height, charactersPosition, blueprint }
}: Props) {
	return <div>{renderCeils(width, height, ponyName, charactersPosition, blueprint)}</div>;
}

const getRole = (charactersPosition: CharactersPosition, i: number, j: number): Role => {
	return charactersPosition.findKey(point => point.x == j && point.y == i) || Role.NONE;
};
