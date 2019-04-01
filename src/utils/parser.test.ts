import { APIState } from '../types';
import { parseGameState } from './parser';

const stateMock: APIState = {
	pony: [3],
	domokun: [7],
	'end-point': [8],
	size: [3, 3],
	difficulty: 0,
	data: [
		['west', 'north'],
		['west', 'north'],
		['north'],
		['north'],
		['north'],
		['north'],
		['north'],
		['north'],
		['west', 'north']
	],
	maze_id: 'c6d8aefa-23fb-42a3-8eeb-347ab807de0d',
	'game-state': {
		state: 'Active',
		'state-result': 'Successfully created'
	}
};

describe('test game state parser', () => {
	it('should match snapshot', () => {
		expect(parseGameState(stateMock)).toMatchSnapshot();
	});
});
