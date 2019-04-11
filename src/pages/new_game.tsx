import * as React from 'react';
import { Link } from 'react-router-dom';
import * as Routes from '../constants/routes.json';
import { Button, Form, Row, Col } from 'react-bootstrap';

import { PonyName } from '../types/index';
import { range } from '../utils/helper';

import './new_game.css';

interface Props {}

const renderSizeSelect = (onChange: (size: number) => any) => {
	return (
		<Form.Control
			size="lg"
			as="select"
			defaultValue="15"
			onChange={(e: any) => onChange(parseInt(e.target.value))}>
			{range(11).map(i => <option key={i}>{i + 15}</option>)}
		</Form.Control>
	);
};

const renderPonyNameSelect = (onChange: (ponyName: PonyName) => any) => {
	return (
		<Form.Control
			size="lg"
			as="select"
			defaultValue={PonyName.APPLEJACK}
			onChange={(e: any) => onChange(e.target.value as PonyName)}>
			{Object.values(PonyName).map(v => <option key={v}>{v}</option>)}
		</Form.Control>
	);
};

const renderDifficultySelect = (onChange: (difficulty: number) => any) => {
	return (
		<Form.Control
			size="lg"
			as="select"
			defaultValue="0"
			onChange={(e: any) => onChange(parseInt(e.target.value))}>
			{range(11).map(i => <option key={i}>{i}</option>)}
		</Form.Control>
	);
};

const NewGame = React.memo(({  }: Props) => {
	const [width, setWidth] = React.useState(15);
	const [height, setHeight] = React.useState(15);
	const [ponyName, setPonyName] = React.useState(PonyName.APPLEJACK);
	const [difficulty, setDifficulty] = React.useState(0);

	return (
		<div className="new-game-container">
			<Form>
				<Form.Group as={Row} className="justify-content-center">
					maze size
				</Form.Group>
				<Form.Group as={Row} className="align-items-center justify-content-center">
					<Form.Group as={Col} md="auto">
						{renderSizeSelect(setWidth)}
					</Form.Group>
					<Form.Group as={Col} md="auto">
						X
					</Form.Group>
					<Form.Group as={Col} md="auto">
						{renderSizeSelect(setHeight)}
					</Form.Group>
				</Form.Group>
				<Form.Group>{renderPonyNameSelect(setPonyName)}</Form.Group>
				<Form.Group as={Row} className="align-items-center justify-content-center">
					<Form.Label column>difficulty</Form.Label>
					<Col md="auto">{renderDifficultySelect(setDifficulty)}</Col>
				</Form.Group>
				<Form.Group as={Row} className="justify-content-center">
					<Link
						className="link-style"
						to={`${
							Routes.GAME
						}?width=${width}&height=${height}&ponyName=${ponyName}&difficulty=${difficulty}`}>
						<Button size="lg">Play</Button>
					</Link>
				</Form.Group>
			</Form>
		</div>
	);
});

export default NewGame;
