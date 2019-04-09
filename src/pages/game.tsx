import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
// import { Link } from 'react-router-dom';
// import * as Routes from '../constants/routes.json';

import { parseQuery } from '../utils/helper';
import { PonyName } from '../types/index';
import { StoreState } from '../store/store';
import Loadable from '../components/loadable/loadable';
import { init, GameAction } from '../actions/game';
import GameComponent from '../components/game/game';

import './game.css';

type Props = ReturnType<typeof mapDispatchToProps> & {
	width: number;
	height: number;
	ponyName: PonyName;
	difficulty: number;
	history: any;
};

const Game = React.memo(({ width, height, ponyName, difficulty, history, init }: Props) => {
	return (
		<div className="game-container">
			<Loadable load={init(width, height, ponyName, difficulty)}>
				<GameComponent ponyName={ponyName} newGameFunction={() => history.goBack(1)} />
			</Loadable>
		</div>
	);
});

const mapStateToProps = (_: any, own: any) => {
	const query = parseQuery(own.location.search) as any;

	return {
		width: parseInt(query.width),
		height: parseInt(query.height),
		ponyName: query.ponyName,
		difficulty: parseInt(query.difficulty)
	};
};

// in lack of redux-thunk pull request #224
const mapDispatchToProps = (dispatch: ThunkDispatch<StoreState, void, GameAction>) => ({
	init: (width: number, height: number, playerName: PonyName, difficulty: number) =>
		dispatch(init(width, height, playerName, difficulty))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Game);
