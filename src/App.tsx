import * as React from 'react';
import './App.css';

import Game from './components/game/game';
import MockPonyApi from './api/mock_pony_api';
import { parseGameState } from './utils/parser';

class App extends React.Component<any, any> {
	constructor(props: any) {
		super(props);

		this.state = {
			gameState: {}
		};
	}

	public componentDidMount() {
		MockPonyApi.getState('').then(r => {
			this.setState({ gameState: r });
		});
	}

	public render() {
		const { gameState } = this.state;

		return gameState.size ? <Game gameState={parseGameState(gameState)} /> : null;
	}
}

export default App;
