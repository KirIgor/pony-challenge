import {
	Role,
	Side,
	Blueprint,
	CharactersPosition,
	BorderConnection,
	RainbowPath,
	RainbowType,
	RainbowPosition,
	Direction
} from '../../types/index';

// border connections

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

export const getRole = (charactersPosition: CharactersPosition, x: number, y: number): Role => {
	return charactersPosition.findKey(point => point.x == x && point.y == y) || Role.NONE;
};

// rainbow

export const getRainbowType = (rainbowPath: RainbowPath, x: number, y: number): RainbowType => {
	if (rainbowPath.length == 0) return RainbowType.NONE;
	if (rainbowPath.length == 1) {
		const { x: rx, y: ry } = rainbowPath[0];
		switch (rainbowPath[0].direction) {
			case Direction.NORTH:
			case Direction.SOUTH: {
				return rx == x && ry == y ? RainbowType.NORTH : RainbowType.NONE;
			}
			case Direction.WEST:
			case Direction.EAST: {
				return rx == x && ry == y ? RainbowType.WEST : RainbowType.NONE;
			}
		}
	}
	if (rainbowPath.length == 2) {
		if (rainbowPath[1].x == x && rainbowPath[1].y == y)
			return getRainbowType(rainbowPath.slice(-1) as RainbowPath, x, y);

		if (rainbowPath[0].x != x || rainbowPath[0].y != y) return RainbowType.NONE;

		const prev: RainbowPosition = rainbowPath[0];
		const next: RainbowPosition = rainbowPath[1];

		if (
			(prev.direction == Direction.NORTH && next.direction == Direction.EAST) ||
			(prev.direction == Direction.WEST && next.direction == Direction.SOUTH)
		) {
			return RainbowType.NORTH_TO_EAST;
		} else if (
			(prev.direction == Direction.EAST && next.direction == Direction.SOUTH) ||
			(prev.direction == Direction.NORTH && next.direction == Direction.WEST)
		) {
			return RainbowType.EAST_TO_SOUTH;
		} else if (
			(prev.direction == Direction.SOUTH && next.direction == Direction.WEST) ||
			(prev.direction == Direction.NORTH && next.direction == Direction.EAST)
		) {
			return RainbowType.SOUTH_TO_WEST;
		} else if (
			(prev.direction == Direction.WEST && next.direction == Direction.NORTH) ||
			(prev.direction == Direction.SOUTH && next.direction == Direction.EAST)
		) {
			return RainbowType.WEST_TO_NORTH;
		}
	}
	return RainbowType.NONE;
};
