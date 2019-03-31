import * as React from 'react';
import classNames from 'classnames';

import { Role, Side } from '../../types';

interface Props {
	sides: Side[];
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
				left: sides.includes(Side.LEFT),
				right: sides.includes(Side.RIGHT),
				top: sides.includes(Side.TOP),
				bottom: sides.includes(Side.BOTTOM)
			})}>
			{renderRoleImage(role)}
		</div>
	);
}
