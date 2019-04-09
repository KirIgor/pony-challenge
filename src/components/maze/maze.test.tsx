import * as React from 'react';
import * as enzyme from 'enzyme';
import { Map as iMap, List as iList } from 'immutable';

import { GameState, Role, Point, BlueprintRecord, PonyName, GameStatus } from '../../types/index';
import Maze from './maze';

const width = 3;
const height = 2;
const testState = new GameState({
	mazeId: '',
	width,
	height,
	gameStatus: GameStatus.ACTIVE,
	charactersPosition: iMap<Role, Point>(),
	blueprint: iList<iList<BlueprintRecord>>().withMutations(state =>
		state
			.setIn([0, 0], new BlueprintRecord({ sides: 0 }))
			.setIn([0, 1], new BlueprintRecord({ sides: 1 }))
			.setIn([0, 2], new BlueprintRecord({ sides: 2 }))
			.setIn([1, 0], new BlueprintRecord({ sides: 0 }))
			.setIn([1, 1], new BlueprintRecord({ sides: 1 }))
			.setIn([1, 2], new BlueprintRecord({ sides: 2 }))
	)
});

const maze = enzyme.render(
	<Maze gameState={testState} ponyName={PonyName.APPLEJACK} rainbowPath={[]} />
);

describe('maze', () => {
	it('should render correct num of rows', () => {
		expect(maze.find('.row').length).toBe(height);
	});

	it('should render correct num of children', () => {
		expect(maze.find('.cell').length).toBe(width * height);
	});
});
