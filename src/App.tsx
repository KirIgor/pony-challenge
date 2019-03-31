import * as React from 'react';
import './App.css';

// import MazeCeil from './maze_ceil';

// import { logger } from './utils/logger';
import MockPonyApi from './api/mock_pony_api';

class App extends React.Component {
	public render() {
		return <div />;
	}
}

MockPonyApi.getState('');
export default App;
