import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { bindActionCreators } from 'redux';

import { parseQuery } from '../utils/helper';
import { PonyName } from '../types/index';
import { StoreState } from '../store/store';
import Loadable from '../components/loadable/loadable';
import { init, GameAction } from '../actions/game';
import GameComponent from '../components/game/game';
import { toggleMusic } from '../actions/music';

import './game.css';

type Props = ReturnType<typeof mapDispatchToProps> & {
	width: number;
	height: number;
	ponyName: PonyName;
	difficulty: number;
	history: any;
	musicPlaying: boolean;
	toggleMusic: typeof toggleMusic;
};

const BackBtn = React.memo(({ backFunction }: { backFunction: () => any }) => {
	return (
		<div className="back-btn-container" onClick={() => backFunction()}>
			<img className="back-btn-image" src="https://icongr.am/fontawesome/arrow-left.svg" />
		</div>
	);
});

const MusicImage = React.memo(
	({ musicPlaying, toggleMusic }: { musicPlaying: boolean; toggleMusic: () => void }) => {
		return (
			<div className="music-container" onClick={() => toggleMusic()}>
				<img className="music-image" src="https://icongr.am/fontawesome/music.svg" />
				<img
					className="cross-music-image"
					style={{ display: musicPlaying ? 'none' : undefined }}
					src="https://icongr.am/clarity/minus.svg?color=ff0000"
				/>
			</div>
		);
	}
);

const Game = React.memo(
	({ width, height, ponyName, difficulty, history, init, musicPlaying, toggleMusic }: Props) => {
		const initialization = React.useMemo(() => init(width, height, ponyName, difficulty), [
			width,
			height,
			ponyName,
			difficulty
		]);
		const newGameFunction = React.useMemo(() => () => history.goBack(1), []);

		return (
			<div className="game-container">
				<Loadable load={initialization}>
					<BackBtn backFunction={() => history.goBack(1)} />
					<MusicImage musicPlaying={musicPlaying} toggleMusic={toggleMusic} />
					<GameComponent ponyName={ponyName} newGameFunction={newGameFunction} />
				</Loadable>
			</div>
		);
	}
);

const mapStateToProps = (state: StoreState, own: any) => {
	const query = parseQuery(own.location.search) as any;

	return {
		width: parseInt(query.width),
		height: parseInt(query.height),
		ponyName: query.ponyName,
		difficulty: parseInt(query.difficulty),
		musicPlaying: state.music.playing
	};
};

const mapDispatchToProps = (dispatch: ThunkDispatch<StoreState, void, GameAction>) => ({
	// it's not bindActionCreators in lack of redux-thunk pull request #224
	init: (width: number, height: number, playerName: PonyName, difficulty: number) =>
		dispatch(init(width, height, playerName, difficulty)),
	toggleMusic: bindActionCreators(toggleMusic, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Game);
