import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { PonyName, Direction } from '../../types/index';
import { init, move } from '../../actions/game';
import { StoreState } from '../../store/store';
import { GameState } from '../../types/index';
import Maze from '../maze/maze';

interface Props {
	gameState: GameState;
	init: typeof init;
	move: typeof move;
}

const onMove = (moveF: typeof move) => (e: React.KeyboardEvent) => {
	const direction = keyCodeToDirection(e.keyCode);
	if (direction) moveF(direction);
};

function Game({ gameState, init, move }: Props) {
	React.useEffect(() => {
		init(15, 15, PonyName.APPLEJACK, 0);
	}, []);

	return (
		<div ref={node => node && node.focus()} tabIndex={0} onKeyDown={onMove(move)}>
			<Maze gameState={gameState} ponyName={PonyName.APPLEJACK} />
		</div>
	);
}

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
