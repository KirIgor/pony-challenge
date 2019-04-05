import * as React from 'react';

import { Role, PonyName } from '../../types/index';

import './cell_role.css';

interface Props {
	role: Role;
	ponyName: PonyName;
}

const CellRole = React.memo(({ ponyName, role = Role.NONE }: Props) => {
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
		case Role.NONE: {
			return null;
		}
	}
});

const getPonyImgSrc = (ponyName: PonyName) => {
	return `/images/ponies/${ponyName.toLowerCase()}.png`;
};

export default CellRole;
