import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { PonyName, Direction, RainbowPath, Role, Side } from '../../types/index';
import { move } from '../../actions/game';
import { hasSide } from '../maze/maze_helper';
import { StoreState } from '../../store/store';
import { GameState } from '../../types/index';
import Maze from '../maze/maze';

interface Props {
	ponyName: PonyName;
	gameState: GameState;
	move: typeof move;
}

const onMove = (moveF: typeof move) => (
	isMoving: boolean,
	setMoving: React.Dispatch<React.SetStateAction<boolean>>
) => (gameState: GameState, setPath: React.Dispatch<React.SetStateAction<RainbowPath>>) => async (
	e: React.KeyboardEvent
) => {
	if (isMoving) return;

	const direction = keyCodeToDirection(e.keyCode);
	if (!direction) return;

	const side = directionToSide(direction);

	const { x, y } = gameState.charactersPosition.get(Role.PONY)!;
	const width = gameState.width;
	const height = gameState.height;

	if (!hasSide(gameState.blueprint, x, y, width, height, side)) {
		setMoving(true);
		await moveF(direction);
		setMoving(false);

		setPath(prev => prev.slice(-1).concat({ x, y, direction }) as RainbowPath);
	}
};

const Game = React.memo(({ gameState, ponyName, move }: Props) => {
	const [rainbowPath, setPath] = React.useState<RainbowPath>([]);
	const [isMoving, setMoving] = React.useState<boolean>(false);

	return (
		<div
			ref={node => node && node.focus()}
			tabIndex={0}
			onKeyDown={onMove(move)(isMoving, setMoving)(gameState, setPath)}>
			<Maze gameState={gameState} ponyName={ponyName} rainbowPath={rainbowPath} />
		</div>
	);
});

const directionToSide = (direction: Direction): Side => {
	switch (direction) {
		case Direction.WEST:
			return Side.LEFT;
		case Direction.EAST:
			return Side.RIGHT;
		case Direction.NORTH:
			return Side.TOP;
		case Direction.SOUTH:
			return Side.BOTTOM;
	}
};

const keyCodeToDirection = (keyCode: number): Direction | undefined => {
	switch (keyCode) {
		case 37:
		case 65:
			return Direction.WEST;
		case 38:
		case 87:
			return Direction.NORTH;
		case 39:
		case 68:
			return Direction.EAST;
		case 40:
		case 83:
			return Direction.SOUTH;
		default:
			return undefined;
	}
};

const mapStateToProps = (state: StoreState) => ({ gameState: state.game });
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({ move }, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Game);
