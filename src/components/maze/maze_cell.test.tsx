import * as React from 'react';
import * as enzyme from 'enzyme';

import { Role, PonyName, RainbowType, Side, BorderConnection } from '../../types/index';
import MazeCell from './maze_cell';

const mazeCell = enzyme.shallow(
	<MazeCell
		sides={Side.TOP | Side.LEFT | Side.RIGHT}
		role={Role.NONE}
		ponyName={PonyName.APPLEJACK}
		borderConnections={BorderConnection.TOP_LEFT | BorderConnection.BOTTOM_RIGHT}
		rainbowType={RainbowType.NORTH_TO_EAST}
	/>
);

describe('maze cell', () => {
	it('should render left, right and top side correctly', () => {
		expect(mazeCell.find('.left').length).toBe(1);
		expect(mazeCell.find('.right').length).toBe(1);
		expect(mazeCell.find('.top').length).toBe(1);
		expect(mazeCell.find('.bottom').length).toBe(0);
	});

	it('should render border connection top_left and bottom_right correctly', () => {
		expect(mazeCell.find('.top_left').length).toBe(1);
		expect(mazeCell.find('.top_right').length).toBe(0);
		expect(mazeCell.find('.bottom_right').length).toBe(1);
		expect(mazeCell.find('.bottom_left').length).toBe(0);
	});

	it('should render rainbow north_to_east type correctly', () => {
		expect(mazeCell.find('.rainbow_horizontal').length).toBe(0);
		expect(mazeCell.find('.rainbow_vertical').length).toBe(0);
		expect(mazeCell.find('.rainbow_north_to_east').length).toBe(1);
		expect(mazeCell.find('.rainbow_east_to_south').length).toBe(0);
		expect(mazeCell.find('.rainbow_south_to_west').length).toBe(0);
		expect(mazeCell.find('.rainbow_west_to_north').length).toBe(0);
	});
});
