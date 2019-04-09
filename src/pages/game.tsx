import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
// import { Link } from 'react-router-dom';
// import * as Routes from '../constants/routes.json';

import { PonyName } from '../types/index';
import { StoreState } from '../store/store';
import Loadable from '../components/loadable/loadable';
import { init, GameAction } from '../actions/game';
import GameComponent from '../components/game/game';

import './game.css';

type Props = ReturnType<typeof mapDispatchToProps> & {};

const Game = React.memo(({ init }: Props) => {
	return (
		<div className="game-container">
			<Loadable load={init(15, 15, PonyName.APPLEJACK, 7)}>
				<GameComponent />
			</Loadable>
		</div>
	);
});

// in lack of redux-thunk pull request #224
const mapDispatchToProps = (dispatch: ThunkDispatch<StoreState, void, GameAction>) => ({
	init: (width: number, height: number, playerName: PonyName, difficulty: number) =>
		dispatch(init(width, height, playerName, difficulty))
});

export default connect(
	null,
	mapDispatchToProps
)(Game);
