import * as React from 'react';
import { GameState } from '../../types';

import Maze from '../maze/maze';

interface Props {
	gameState: GameState;
}

export default function Game({ gameState }: Props) {
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
