import * as React from 'react';
import { Provider } from 'react-redux';

import Game from './components/game/game';
import { newStore } from './store/store';
import { PonyAPI } from './api/pony_api';
import ChallengePonyAPI from './api/challenge_pony_api';

import './App.css';

export const ponyAPI: PonyAPI = ChallengePonyAPI;

const store = newStore();

class App extends React.Component<any, any> {
	public componentDidMount() {}

	public render() {
		return (
			<Provider store={store}>
				<Game />
			</Provider>
		);
	}
}

export default App;
