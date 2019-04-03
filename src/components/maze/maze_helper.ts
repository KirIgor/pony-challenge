import {
	Role,
	Side,
	Blueprint,
	RainbowPath,
	CharactersPosition,
	RainbowPosition,
	RainbowType,
	BorderConnection
} from '../../types/index';
// border radius

const isBorderConnectionTopLeft = (
	blueprint: Blueprint,
	x: number,
	y: number,
	width: number,
	height: number
): boolean => {
	return (
		((blueprint.getIn([y, x, 'sides']) & Side.TOP) != 0 ||
			(blueprint.getIn([Math.max(y - 1, 0), x, 'sides']) & Side.BOTTOM) != 0) &&
		((blueprint.getIn([y, x, 'sides']) & Side.LEFT) != 0 ||
			(blueprint.getIn([y, Math.max(x - 1, 0), 'sides']) & Side.RIGHT) != 0) &&
		(blueprint.getIn([Math.max(y - 1, 0), Math.max(x - 1, 0), 'sides']) & Side.RIGHT) == 0 &&
		(blueprint.getIn([Math.max(y - 1, 0), Math.max(x - 1, 0), 'sides']) & Side.BOTTOM) == 0 &&
		(blueprint.getIn([Math.max(y - 1, 0), x, 'sides']) & Side.LEFT) == 0 &&
		(blueprint.getIn([y, Math.max(x - 1, 0), 'sides']) & Side.TOP) == 0
	);
};

const isBorderConnectionTopRight = (
	blueprint: Blueprint,
	x: number,
	y: number,
	width: number,
	height: number
): boolean => {
	return (
		((blueprint.getIn([y, x, 'sides']) & Side.TOP) != 0 ||
			(blueprint.getIn([Math.max(y - 1, 0), x, 'sides']) & Side.BOTTOM) != 0) &&
		((blueprint.getIn([y, x, 'sides']) & Side.RIGHT) != 0 ||
			(blueprint.getIn([y, Math.min(x + 1, width - 1), 'sides']) & Side.LEFT) != 0) &&
		(blueprint.getIn([Math.max(y - 1, 0), Math.min(x + 1, width - 1), 'sides']) & Side.LEFT) == 0 &&
		(blueprint.getIn([Math.max(y - 1, 0), Math.min(x + 1, width - 1), 'sides']) & Side.BOTTOM) ==
			0 &&
		(blueprint.getIn([Math.max(y - 1, 0), x, 'sides']) & Side.RIGHT) == 0 &&
		(blueprint.getIn([y, Math.min(x + 1, width - 1), 'sides']) & Side.TOP) == 0
	);
};

const isBorderConnectionBottomLeft = (
	blueprint: Blueprint,
	x: number,
	y: number,
	width: number,
	height: number
): boolean => {
	return (
		((blueprint.getIn([y, x, 'sides']) & Side.BOTTOM) != 0 ||
			(blueprint.getIn([Math.min(y + 1, height - 1), x, 'sides']) & Side.TOP) != 0) &&
		((blueprint.getIn([y, x, 'sides']) & Side.LEFT) != 0 ||
			(blueprint.getIn([y, Math.max(x - 1, 0), 'sides']) & Side.RIGHT) != 0) &&
		(blueprint.getIn([Math.min(y + 1, height - 1), Math.max(x - 1, 0), 'sides']) & Side.RIGHT) ==
			0 &&
		(blueprint.getIn([Math.min(y + 1, height - 1), Math.max(x - 1, 0), 'sides']) & Side.TOP) == 0 &&
		(blueprint.getIn([Math.min(y + 1, height - 1), x, 'sides']) & Side.LEFT) == 0 &&
		(blueprint.getIn([y, Math.max(x - 1, 0), 'sides']) & Side.BOTTOM) == 0
	);
};

const isBorderConnectionBottomRight = (
	blueprint: Blueprint,
	x: number,
	y: number,
	width: number,
	height: number
): boolean => {
	return (
		((blueprint.getIn([y, x, 'sides']) & Side.BOTTOM) != 0 ||
			(blueprint.getIn([Math.min(y + 1, height - 1), x, 'sides']) & Side.TOP) != 0) &&
		((blueprint.getIn([y, x, 'sides']) & Side.RIGHT) != 0 ||
			(blueprint.getIn([y, Math.min(x + 1, width - 1), 'sides']) & Side.LEFT) != 0) &&
		(blueprint.getIn([Math.min(y + 1, height - 1), Math.min(x + 1, width - 1), 'sides']) &
			Side.LEFT) ==
			0 &&
		(blueprint.getIn([Math.min(y + 1, height - 1), Math.min(x + 1, width - 1), 'sides']) &
			Side.TOP) ==
			0 &&
		(blueprint.getIn([Math.min(y + 1, height - 1, x), 'sides']) & Side.RIGHT) == 0 &&
		(blueprint.getIn([y, Math.min(x + 1, width - 1), 'sides']) & Side.BOTTOM) == 0
	);
};

export const getBorderConnections = (
	blueprint: Blueprint,
	x: number,
	y: number,
	width: number,
	height: number
): number => {
	return (
		(isBorderConnectionTopLeft(blueprint, x, y, width, height) ? BorderConnection.TOP_LEFT : 0) |
		(isBorderConnectionTopRight(blueprint, x, y, width, height) ? BorderConnection.TOP_RIGHT : 0) |
		(isBorderConnectionBottomLeft(blueprint, x, y, width, height)
			? BorderConnection.BOTTOM_LEFT
			: 0) |
		(isBorderConnectionBottomRight(blueprint, x, y, width, height)
			? BorderConnection.BOTTOM_RIGHT
			: 0)
	);
};

// role

const getPrimaryRole = (
	charactersPosition: CharactersPosition,
	x: number,
	y: number
): Role | undefined => {
	return charactersPosition.findKey(point => point.x == x && point.y == y);
};

const getRainbowRole = (rainbowPath: RainbowPath, x: number, y: number): Role | undefined => {
	const curPosition = (rainbowPath as RainbowPosition[]).find(pos => pos.x == x && pos.y == y);

	if (curPosition) {
		switch (curPosition.type) {
			case RainbowType.HORIZONTAL:
				return Role.RAINBOW_HORIZONTAL;
			case RainbowType.VERTICAL:
				return Role.RAINBOW_VERTICAL;
		}
	}

	return undefined;
};

export const getRole = (
	charactersPosition: CharactersPosition,
	rainbowPath: RainbowPath,
	x: number,
	y: number
): Role => {
	return getPrimaryRole(charactersPosition, x, y) || getRainbowRole(rainbowPath, x, y) || Role.NONE;
};
