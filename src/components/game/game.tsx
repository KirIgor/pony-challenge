import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { PonyName, Direction, RainbowType, RainbowPath, Role } from '../../types/index';
import { init, move } from '../../actions/game';
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
) => (e: React.KeyboardEvent) => {
	const direction = keyCodeToDirection(e.keyCode);
	if (direction) {
		moveF(direction);

		const type: RainbowType = directionToRainbowType(direction);
		const { x, y } = gameState.charactersPosition.get(Role.PONY)!;
		setPath(prev => prev.slice(-1).concat({ x, y, type }) as RainbowPath);
	}
};

function Game({ gameState, init, move }: Props) {
	React.useEffect(() => {
		init(15, 15, PonyName.APPLEJACK, 10);
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
}

const directionToRainbowType = (direction: Direction): RainbowType => {
	switch (direction) {
		case Direction.WEST:
		case Direction.EAST: {
			return RainbowType.HORIZONTAL;
		}
		case Direction.NORTH:
		case Direction.SOUTH: {
			return RainbowType.VERTICAL;
		}
	}
};

const keyCodeToDirection = (keyCode: number): Direction | undefined => {
	switch (keyCode) {
		case 37:
		case 65: {
			return Direction.WEST;
		}
		case 38:
		case 87: {
			return Direction.NORTH;
		}
		case 39:
		case 68: {
			return Direction.EAST;
		}
		case 40:
		case 83: {
			return Direction.SOUTH;
		}
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
