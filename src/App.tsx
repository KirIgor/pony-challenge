import * as React from 'react';
import './App.css';

import Game from './components/game/game';
import { PonyAPI } from './api/pony_api';
import ChallengePonyAPI from './api/challenge_pony_api';
import { parseGameState } from './utils/parser';

export const ponyAPI: PonyAPI = ChallengePonyAPI;

class App extends React.Component<any, any> {
	constructor(props: any) {
		super(props);

		this.state = {
			gameState: {}
		};
	}

	public componentDidMount() {
		ponyAPI.getState('').then(r => {
			this.setState({ gameState: r });
		});
	}

	public render() {
		const { gameState } = this.state;

		return gameState.size ? <Game gameState={parseGameState(gameState)} /> : null;
	}
}

export default App;
