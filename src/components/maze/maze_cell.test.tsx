import * as React from 'react';
import * as enzyme from 'enzyme';

import { range } from '../../utils/helper';
import { Role, PonyName, RainbowType } from '../../types/index';
import MazeCell from './maze_cell';

describe('maze cell', () => {
	it('renders correct sides', () => {
		const mapping = {
			1: 'left',
			2: 'right',
			4: 'top',
			8: 'bottom'
		};

		const shouldContain = (i: number, side: number) => i & side;

		range(15).forEach(i => {
			const mazeCell = enzyme.shallow(
				<MazeCell
					sides={i}
					role={Role.NONE}
					ponyName={PonyName.APPLEJACK}
					borderConnections={0}
					rainbowType={RainbowType.NONE}
				/>
			);
			const className = mazeCell.find('.cell').getElement().props.className;

			[1, 2, 4, 8].forEach(side => {
				if (shouldContain(i, side)) expect(className).toMatch(mapping[side]);
			});
		});
	});
});
