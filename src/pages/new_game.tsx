import * as React from 'react';
import { Link } from 'react-router-dom';
import * as Routes from '../constants/routes.json';

import { PonyName } from '../types/index';
import { range } from '../utils/helper';

import './new_game.css';

interface Props {}

const renderSizeSelect = (onChange: (size: number) => any) => {
	return (
		<select
			defaultValue="15"
			onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange(parseInt(e.target.value))}>
			{range(11).map(i => <option key={i}>{i + 15}</option>)}
		</select>
	);
};

const renderPonyNameSelect = (onChange: (ponyName: PonyName) => any) => {
	return (
		<select
			defaultValue={PonyName.APPLEJACK}
			onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange(e.target.value as PonyName)}>
			{Object.values(PonyName).map(v => <option key={v}>{v}</option>)}
		</select>
	);
};

const renderDifficultySelect = (onChange: (difficulty: number) => any) => {
	return (
		<select
			defaultValue="0"
			onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange(parseInt(e.target.value))}>
			{range(11).map(i => <option key={i}>{i}</option>)}
		</select>
	);
};

const NewGame = React.memo(({  }: Props) => {
	const [width, setWidth] = React.useState(15);
	const [height, setHeight] = React.useState(15);
	const [ponyName, setPonyName] = React.useState(PonyName.APPLEJACK);
	const [difficulty, setDifficulty] = React.useState(0);

	return (
		<div className="new-game-container">
			<div className="new-game-items">
				<div>
					{renderSizeSelect(setWidth)}X{renderSizeSelect(setHeight)}
				</div>
				<div>{renderPonyNameSelect(setPonyName)}</div>
				<div>difficulty: {renderDifficultySelect(setDifficulty)}</div>
				<Link
					to={`${
						Routes.GAME
					}?width=${width}&height=${height}&ponyName=${ponyName}&difficulty=${difficulty}`}>
					Play
				</Link>
			</div>
		</div>
	);
});

export default NewGame;
