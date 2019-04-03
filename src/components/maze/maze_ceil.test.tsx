import * as React from 'react';
import * as enzyme from 'enzyme';

import { range } from '../../utils/helper';
import { Role } from '../../types/index';
import MazeCeil from './maze_ceil';

describe('maze ceil', () => {
	it('renders correct sides', () => {
		const mapping = {
			1: 'left',
			2: 'right',
			4: 'top',
			8: 'bottom'
		};

		const shouldContain = (i: number, side: number) => i & side;

		range(15).forEach(i => {
			const mazeCeil = enzyme.shallow(<MazeCeil sides={i} role={Role.NONE} />);
			const className = mazeCeil.find('.ceil').getElement().props.className;

			[1, 2, 4, 8].forEach(side => {
				if (shouldContain(i, side)) expect(className).toMatch(mapping[side]);
			});
		});
	});
});
