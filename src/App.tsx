import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { spring } from 'react-motion';
import { AnimatedSwitch } from 'react-router-transition';

import { newStore } from './store/store';
import { PonyAPI } from './api/pony_api';
import ChallengePonyAPI from './api/challenge_pony_api';

import Hello from './pages/hello';
import NewGame from './pages/new_game';
import Game from './pages/game';
import Music from './components/music/music';

import * as Routes from './constants/routes.json';

import './App.css';

export const ponyAPI: PonyAPI = ChallengePonyAPI;

const store = newStore();

const glide = (val: number) =>
	spring(val, {
		stiffness: 174,
		damping: 24
	});

class App extends React.Component<any, any> {
	public componentDidMount() {}

	public render() {
		return (
			<Provider store={store}>
				<Router>
					<div>
						<Music />
						<AnimatedSwitch
							atEnter={{ offset: 100 }}
							atLeave={{ offset: glide(-100) }}
							atActive={{ offset: glide(0) }}
							mapStyles={(styles: any) => ({
								transform: `translateX(${styles.offset}%)`
							})}>
							<Route exact path={Routes.HELLO} component={Hello} />
							<Route path={Routes.NEW_GAME} component={NewGame} />
							<Route path={Routes.GAME} component={Game} />
						</AnimatedSwitch>
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
