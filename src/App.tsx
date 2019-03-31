import * as React from 'react';
import './App.css';

import Maze from './components/maze/maze';
import MockPonyApi from './api/mock_pony_api';
import { parseGameState } from './api/parser';

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

		return <Maze {...gameState.size && parseGameState(gameState)} />;
	}
}

export default App;
