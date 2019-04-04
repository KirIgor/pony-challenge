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
		if (rx != x || ry != y) return RainbowType.NONE;

		switch (rainbowPath[0].direction) {
			case Direction.WEST:
			case Direction.EAST: {
				return RainbowType.WEST_RED_TO_TOP;
			}
			case Direction.NORTH:
			case Direction.SOUTH: {
				return RainbowType.NORTH_RED_TO_LEFT;
			}
		}
	}
	if (rainbowPath.length == 2) {
		const prev: RainbowPosition = rainbowPath[0];
		const next: RainbowPosition = rainbowPath[1];

		if (
			(prev.direction == Direction.NORTH && next.direction == Direction.NORTH) ||
			(prev.direction == Direction.SOUTH && next.direction == Direction.SOUTH)
		) {
			if ((prev.x == x && prev.y == y) || (next.x == x && next.y == y))
				return RainbowType.NORTH_RED_TO_LEFT;
		} else if (
			(prev.direction == Direction.WEST && next.direction == Direction.WEST) ||
			(prev.direction == Direction.EAST && next.direction == Direction.EAST)
		) {
			if ((prev.x == x && prev.y == y) || (next.x == x && next.y == y))
				return RainbowType.WEST_RED_TO_TOP;
		} else if (prev.direction == Direction.NORTH && next.direction == Direction.EAST) {
			if (prev.x == x && prev.y == y) return RainbowType.NORTH_RED_TO_LEFT;
			if (next.x == x && next.y == y) return RainbowType.NORTH_TO_EAST;
		} else if (prev.direction == Direction.WEST && next.direction == Direction.SOUTH) {
			if (prev.x == x && prev.y == y) return RainbowType.WEST_RED_TO_TOP;
			if (next.x == x && next.y == y) return RainbowType.NORTH_TO_EAST;
		} else if (prev.direction == Direction.EAST && next.direction == Direction.SOUTH) {
			if (prev.x == x && prev.y == y) return RainbowType.WEST_RED_TO_TOP;
			if (next.x == x && next.y == y) return RainbowType.EAST_TO_SOUTH;
		} else if (prev.direction == Direction.NORTH && next.direction == Direction.WEST) {
			if (prev.x == x && prev.y == y) return RainbowType.NORTH_RED_TO_RIHGT;
			if (next.x == x && next.y == y) return RainbowType.EAST_TO_SOUTH;
		} else if (prev.direction == Direction.SOUTH && next.direction == Direction.WEST) {
			if (prev.x == x && prev.y == y) return RainbowType.NORTH_RED_TO_RIHGT;
			if (next.x == x && next.y == y) return RainbowType.SOUTH_TO_WEST;
		} else if (prev.direction == Direction.EAST && next.direction == Direction.NORTH) {
			if (prev.x == x && prev.y == y) return RainbowType.WEST_RED_TO_BOTTOM;
			if (next.x == x && next.y == y) return RainbowType.SOUTH_TO_WEST;
		} else if (prev.direction == Direction.WEST && next.direction == Direction.NORTH) {
			if (prev.x == x && prev.y == y) return RainbowType.WEST_RED_TO_BOTTOM;
			if (next.x == x && next.y == y) return RainbowType.WEST_TO_NORTH;
		} else if (prev.direction == Direction.SOUTH && next.direction == Direction.EAST) {
			if (prev.x == x && prev.y == y) return RainbowType.NORTH_RED_TO_LEFT;
			if (next.x == x && next.y == y) return RainbowType.WEST_TO_NORTH;
		}
	}
	return RainbowType.NONE;
};
