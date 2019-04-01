import * as React from 'react';
import { connect } from 'react-redux';

import Maze from '../maze/maze';

export default function Game() {
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
