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

export const hasSide = (
	blueprint: Blueprint,
	x: number,
	y: number,
	width: number,
	height: number,
	side: Side
): boolean => {
	switch (side) {
		case Side.LEFT: {
			if (x == 0) return true;
			return (
				(blueprint.getIn([y, x, 'sides']) & Side.LEFT) != 0 ||
				(blueprint.getIn([y, x - 1, 'sides']) & Side.RIGHT) != 0
			);
		}
		case Side.RIGHT: {
			if (x == width - 1) return true;
			return (
				(blueprint.getIn([y, x, 'sides']) & Side.RIGHT) != 0 ||
				(blueprint.getIn([y, x + 1, 'sides']) & Side.LEFT) != 0
			);
		}
		case Side.TOP: {
			if (y == 0) return true;
			return (
				(blueprint.getIn([y, x, 'sides']) & Side.TOP) != 0 ||
				(blueprint.getIn([y - 1, x, 'sides']) & Side.BOTTOM) != 0
			);
		}
		case Side.BOTTOM: {
			if (y == height - 1) return true;
			return (
				(blueprint.getIn([y, x, 'sides']) & Side.BOTTOM) != 0 ||
				(blueprint.getIn([y + 1, x, 'sides']) & Side.TOP) != 0
			);
		}
	}
};

const isBorderConnectionTopLeft = (
	blueprint: Blueprint,
	x: number,
	y: number,
	width: number,
	height: number
): boolean => {
	if (x == 0 || y == 0) return false;
	return (
		hasSide(blueprint, x, y, width, height, Side.TOP) &&
		hasSide(blueprint, x, y, width, height, Side.LEFT) &&
		!hasSide(blueprint, x - 1, y, width, height, Side.TOP) &&
		!hasSide(blueprint, x, y - 1, width, height, Side.LEFT)
	);
};

const isBorderConnectionTopRight = (
	blueprint: Blueprint,
	x: number,
	y: number,
	width: number,
	height: number
): boolean => {
	if (x == width - 1 || y == 0) return false;
	return (
		hasSide(blueprint, x, y, width, height, Side.TOP) &&
		hasSide(blueprint, x, y, width, height, Side.RIGHT) &&
		!hasSide(blueprint, x + 1, y, width, height, Side.TOP) &&
		!hasSide(blueprint, x, y - 1, width, height, Side.RIGHT)
	);
};

const isBorderConnectionBottomLeft = (
	blueprint: Blueprint,
	x: number,
	y: number,
	width: number,
	height: number
): boolean => {
	if (x == 0 || y == height - 1) return false;
	return (
		hasSide(blueprint, x, y, width, height, Side.BOTTOM) &&
		hasSide(blueprint, x, y, width, height, Side.LEFT) &&
		!hasSide(blueprint, x - 1, y, width, height, Side.BOTTOM) &&
		!hasSide(blueprint, x, y + 1, width, height, Side.LEFT)
	);
};

const isBorderConnectionBottomRight = (
	blueprint: Blueprint,
	x: number,
	y: number,
	width: number,
	height: number
): boolean => {
	if (x == width - 1 || y == height - 1) return false;
	return (
		hasSide(blueprint, x, y, width, height, Side.BOTTOM) &&
		hasSide(blueprint, x, y, width, height, Side.RIGHT) &&
		!hasSide(blueprint, x + 1, y, width, height, Side.BOTTOM) &&
		!hasSide(blueprint, x, y + 1, width, height, Side.RIGHT)
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
				return RainbowType.HORIZONTAL;
			}
			case Direction.NORTH:
			case Direction.SOUTH: {
				return RainbowType.VERTICAL;
			}
		}
	}
	if (rainbowPath.length == 2) {
		const prev: RainbowPosition = rainbowPath[0];
		const next: RainbowPosition = rainbowPath[1];

		if (
			(prev.direction == Direction.EAST && next.direction == Direction.WEST) ||
			(prev.direction == Direction.WEST && next.direction == Direction.EAST) ||
			(prev.direction == Direction.NORTH && next.direction == Direction.SOUTH) ||
			(prev.direction == Direction.SOUTH && next.direction == Direction.NORTH)
		) {
			return RainbowType.NONE;
		}

		if (prev.x == x && prev.y == y)
			return getRainbowType(rainbowPath.slice(0, 1) as RainbowPath, x, y);
		if (next.x != x || next.y != y) return RainbowType.NONE;

		if (
			(prev.direction == Direction.NORTH && next.direction == Direction.NORTH) ||
			(prev.direction == Direction.SOUTH && next.direction == Direction.SOUTH)
		) {
			return RainbowType.VERTICAL;
		} else if (
			(prev.direction == Direction.WEST && next.direction == Direction.WEST) ||
			(prev.direction == Direction.EAST && next.direction == Direction.EAST)
		) {
			return RainbowType.HORIZONTAL;
		} else if (
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
			(prev.direction == Direction.EAST && next.direction == Direction.NORTH)
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
