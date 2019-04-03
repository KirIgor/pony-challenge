import * as React from 'react';
import classNames from 'classnames';

import { Role, Side, PonyName } from '../../types/index';

import CeilRole from './ceil_role';

import './maze_ceil.css';

// sides is bitwise OR of sides
interface Props {
	sides: number;
	role: Role;
	ponyName: PonyName;
}

export default function MazeCeil({ sides, ponyName, role = Role.NONE }: Props) {
	return (
		<div
			className={classNames({
				ceil: true,
				left: sides & Side.LEFT,
				right: sides & Side.RIGHT,
				top: sides & Side.TOP,
				bottom: sides & Side.BOTTOM
			})}>
			<CeilRole ponyName={ponyName} role={role} />
		</div>
	);
}
