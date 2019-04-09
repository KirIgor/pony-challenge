import * as React from 'react';
import { Link } from 'react-router-dom';
import * as Routes from '../constants/routes.json';

import { PonyName } from '../types/index';
import { range } from '../utils/helper';

import './new_game.css';

interface Props {}

const renderSizeSelect = () => {
	return <select>{range(11).map(i => <option>{i + 15}</option>)}</select>;
};

const renderPonyNameSelect = () => {
	return <select>{Object.values(PonyName).map(v => <option>{v}</option>)}</select>;
};

const renderDifficultySelect = () => {
	return <select>{range(11).map(i => <option>{i}</option>)}</select>;
};

const NewGame = React.memo(({  }: Props) => {
	return (
		<div className="new-game-container">
			<div className="new-game-items">
				<div>
					{renderSizeSelect()}X{renderSizeSelect()}
				</div>
				<div>{renderPonyNameSelect()}</div>
				<div>difficulty: {renderDifficultySelect()}</div>
				<Link to={Routes.GAME}>Play</Link>
			</div>
		</div>
	);
});

export default NewGame;
