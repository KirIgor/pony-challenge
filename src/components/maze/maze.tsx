import * as React from 'react';

import { CharactersPosition, GameState, Blueprint, PonyName, RainbowPath } from '../../types/index';
import { range } from '../../utils/helper';
import { getRole, getBorderConnections, getRainbowType } from './maze_helper';

import MazeCell from './maze_cell';

import './maze.css';

interface Props {
	ponyName: PonyName;
	gameState: GameState;
	rainbowPath: RainbowPath;
}

const renderCells = (
	width: number,
	height: number,
	ponyName: PonyName,
	charactersPosition: CharactersPosition,
	rainbowPath: RainbowPath,
	blueprint: Blueprint
) => {
	return range(height).map(i => (
		<Row key={i}>
			{range(width).map(j => (
				<MazeCell
					key={j}
					sides={blueprint.getIn([i, j, 'sides'])}
					role={getRole(charactersPosition, j, i)}
					ponyName={ponyName}
					borderConnections={getBorderConnections(blueprint, j, i, width, height)}
					rainbowType={getRainbowType(rainbowPath, j, i)}
				/>
			))}
		</Row>
	));
};

function Row({ children }: { children: JSX.Element[] }) {
	return <div className="row">{children}</div>;
}

export default function Maze({
	rainbowPath,
	ponyName,
	gameState: { width, height, charactersPosition, blueprint }
}: Props) {
	return (
		<div>{renderCells(width, height, ponyName, charactersPosition, rainbowPath, blueprint)}</div>
	);
}
