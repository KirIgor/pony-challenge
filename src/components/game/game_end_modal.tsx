import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Row } from 'react-bootstrap';

import { StoreState } from '../../store/store';
import { GameStatus } from '../../types/index';

import './game_end_modal.css';

interface Props {
	gameStatus: GameStatus;
	newGameFunction: () => {};
	wins: number;
	loses: number;
}

const GameEndModal = React.memo(({ gameStatus, newGameFunction, wins, loses }: Props) => {
	return gameStatus != GameStatus.ACTIVE ? (
		<div className="maze-status-modal-container">
			<div className="maze-status-modal">
				<Form>
					<Form.Group>
						<img className="status-image" src={getStatusImageSrc(gameStatus)} />
					</Form.Group>
					<Form.Group as={Row} className="statistic-text justify-content-center">
						Wins: {wins}, loses: {loses}
					</Form.Group>
					<Form.Group as={Row} className="justify-content-center">
						<Button size="lg" onClick={newGameFunction}>
							New game
						</Button>
					</Form.Group>
				</Form>
			</div>
		</div>
	) : null;
});

const getStatusImageSrc = (gameStatus: GameStatus) => {
	return gameStatus == GameStatus.WIN
		? 'https://ponychallenge.trustpilot.com/eW91X3NhdmVkX3RoZV9wb255.jpg'
		: 'https://ponychallenge.trustpilot.com/eW91X2tpbGxlZF90aGVfcG9ueQ==.jpg';
};

const mapStateToProps = (state: StoreState) => ({
	wins: state.statistic.wins,
	loses: state.statistic.loses
});

export default connect(
	mapStateToProps,
	null
)(GameEndModal);
