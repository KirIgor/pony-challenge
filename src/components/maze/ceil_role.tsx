import * as React from 'react';

import { Role, PonyName } from '../../types/index';

import './ceil_role.css';

interface Props {
	role: Role;
	ponyName: PonyName;
}

export default function CeilRole({ ponyName, role = Role.NONE }: Props) {
	switch (role) {
		case Role.PONY: {
			return <img className="primary_role_image" src={getPonyImgSrc(ponyName)} />;
		}
		case Role.DOMOKUN: {
			return <img className="primary_role_image" src="/images/domokun.png" />;
		}
		case Role.EXIT: {
			return <img className="primary_role_image" src="/images/rainbow_cake.png" />;
		}
		case Role.RAINBOW_HORIZONTAL: {
			return (
				<img
					className="rainbow_role_image"
					src="/images/rainbow.png"
					style={{ transform: 'rotate(90deg)' }}
				/>
			);
		}
		case Role.RAINBOW_VERTICAL: {
			return <img className="rainbow_role_image" src="/images/rainbow.png" />;
		}
		case Role.NONE: {
			return null;
		}
	}
}

const getPonyImgSrc = (ponyName: PonyName) => {
	return `/images/ponies/${ponyName.toLowerCase()}.png`;
};
