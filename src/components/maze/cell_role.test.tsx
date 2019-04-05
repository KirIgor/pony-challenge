import * as React from 'react';
import * as enzyme from 'enzyme';

import { Role, PonyName } from '../../types/index';
import CellRole from './cell_role';

describe('cell role', () => {
	it('should render null if role is none', () => {
		const cellRole = enzyme.shallow(<CellRole role={Role.NONE} ponyName={PonyName.APPLEJACK} />);

		expect(cellRole.find('.primary_role_image').length).toBe(0);
	});

	it('should render domokun correctly', () => {
		const cellRole = enzyme.shallow(<CellRole role={Role.DOMOKUN} ponyName={PonyName.APPLEJACK} />);

		expect(cellRole.find('.primary_role_image').length).toBe(1);
		expect(cellRole.find('.primary_role_image').props().src).toMatch(/domokun/i);
	});

	it('should render correct pony', () => {
		const cellRole = enzyme.shallow(<CellRole role={Role.PONY} ponyName={PonyName.APPLEJACK} />);

		expect(cellRole.find('.primary_role_image').length).toBe(1);
		expect(cellRole.find('.primary_role_image').props().src).toMatch(/applejack/i);
	});
});
