import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { PonyName } from '../../types/index';
import { init, move } from '../../actions/game';
import { StoreState } from '../../store/store';
import { GameState } from '../../types/index';
import Maze from '../maze/maze';

interface Props {
	gameState: GameState;
	init: typeof init;
	move: typeof move;
}

function Game({ gameState, init }: Props) {
	React.useEffect(() => {
		init(25, 25, PonyName.APPLEJACK, 0);
	}, []);

	return (
		<div>
			<Maze gameState={gameState} />
			<div>
				<button />
				<button />
				<button />
			</div>
		</div>
	);
}

const mapStateToProps = (state: StoreState) => ({ gameState: state.game });
const mapDispatchToProps = (dispatch: Dispatch) => ({
	init: bindActionCreators(init, dispatch),
	move: bindActionCreators(move, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Game);
