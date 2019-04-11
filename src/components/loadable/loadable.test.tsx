import * as React from 'react';
import { act } from 'react-dom/test-utils';
import * as enzyme from 'enzyme';
import * as ReactDOM from 'react-dom';

import Loadable from './loadable';

describe('loadable', () => {
	it('should render spinner and not render children while loading', () => {
		const load = new Promise(() => {});
		const loadable = enzyme.shallow(
			<Loadable load={load}>
				<div id="test" />
			</Loadable>
		);

		expect(loadable.find('.spinner-container').length).toBe(1);
		expect(loadable.find('#test').length).toBe(0);
	});
});
