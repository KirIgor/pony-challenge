import * as React from 'react';
import classNames from 'classnames';

import { Role, Side } from '../../types/index';

import './maze_ceil.css';

// sides is bitwise OR of sides
interface Props {
	sides: number;
	role: Role;
}

const renderRoleImage = (role: Role): JSX.Element | null => {
	switch (role) {
		case Role.PONY: {
			return <span>P</span>;
		}
		case Role.DOMOKUN: {
			return <span>D</span>;
		}
		case Role.EXIT: {
			return <span>E</span>;
		}
		case Role.NONE: {
			return null;
		}
	}
};

export default function MazeCeil({ sides, role = Role.NONE }: Props) {
	return (
		<div
			className={classNames({
				ceil: true,
				left: sides & Side.LEFT,
				right: sides & Side.RIGHT,
				top: sides & Side.TOP,
				bottom: sides & Side.BOTTOM
			})}>
			{renderRoleImage(role)}
		</div>
	);
}
