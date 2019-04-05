import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { PonyName, Direction, RainbowPath, Role, Side } from '../../types/index';
import { init, move } from '../../actions/game';
import { hasSide } from '../maze/maze_helper';
import { StoreState } from '../../store/store';
import { GameState } from '../../types/index';
import Maze from '../maze/maze';

interface Props {
	gameState: GameState;
	init: typeof init;
	move: typeof move;
}

const onMove = (moveF: typeof move) => (
	gameState: GameState,
	setPath: React.Dispatch<React.SetStateAction<RainbowPath>>
) => async (e: React.KeyboardEvent) => {
	const direction = keyCodeToDirection(e.keyCode);
	if (!direction) return;

	const side = directionToSide(direction);

	const { x, y } = gameState.charactersPosition.get(Role.PONY)!;
	const width = gameState.width;
	const height = gameState.height;

	if (!hasSide(gameState.blueprint, x, y, width, height, side)) {
		await moveF(direction);

		setPath(prev => prev.slice(-1).concat({ x, y, direction }) as RainbowPath);
	}
};

const Game = React.memo(({ gameState, init, move }: Props) => {
	React.useEffect(() => {
		init(15, 15, PonyName.APPLEJACK, 7);
	}, []);

	const [rainbowPath, setPath] = React.useState<RainbowPath>([]);

	return (
		<div
			ref={node => node && node.focus()}
			tabIndex={0}
			onKeyDown={onMove(move)(gameState, setPath)}>
			<Maze gameState={gameState} ponyName={PonyName.APPLEJACK} rainbowPath={rainbowPath} />
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
const mapDispatchToProps = (dispatch: Dispatch) => ({
	init: bindActionCreators(init, dispatch),
	move: bindActionCreators(move, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Game);
