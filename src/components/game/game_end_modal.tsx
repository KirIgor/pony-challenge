import * as React from 'react';
import { GameStatus } from '../../types/index';

import './game_end_modal.css';

interface Props {
	gameStatus: GameStatus;
	newGameFunction: () => {};
}

const GameEndModal = React.memo(({ gameStatus, newGameFunction }: Props) => {
	return gameStatus != GameStatus.ACTIVE ? (
		<div className="maze-status-modal-container">
			<div className="maze-status-modal">
				<img className="status-image" src={getStatusImageSrc(gameStatus)} />
				<button className="new-game-button" onClick={newGameFunction}>
					New game
				</button>
			</div>
		</div>
	) : null;
});

const getStatusImageSrc = (gameStatus: GameStatus) => {
	return gameStatus == GameStatus.WIN
		? 'https://ponychallenge.trustpilot.com/eW91X3NhdmVkX3RoZV9wb255.jpg'
		: 'https://ponychallenge.trustpilot.com/eW91X2tpbGxlZF90aGVfcG9ueQ==.jpg';
};

export default GameEndModal;
