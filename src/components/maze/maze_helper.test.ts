import { fromJS, Map as iMap } from 'immutable';

import { hasSide, getBorderConnections, getRole, getRainbowType } from './maze_helper';
import {
	Blueprint,
	BlueprintRecord,
	Side,
	BorderConnection,
	CharactersPosition,
	Role,
	Point,
	RainbowPath,
	Direction,
	RainbowType
} from '../../types/index';

/* ________
	|  |__  |
	|   ____|
	|_______|
*/
const blueprint: Blueprint = fromJS([
	[
		new BlueprintRecord({ sides: Side.TOP | Side.LEFT }),
		new BlueprintRecord({ sides: Side.TOP | Side.LEFT }),
		new BlueprintRecord({ sides: Side.TOP | Side.RIGHT })
	],
	[
		new BlueprintRecord({ sides: Side.LEFT }),
		new BlueprintRecord({ sides: Side.TOP }),
		new BlueprintRecord({ sides: Side.RIGHT })
	],
	[
		new BlueprintRecord({ sides: Side.BOTTOM | Side.LEFT }),
		new BlueprintRecord({ sides: Side.BOTTOM | Side.TOP }),
		new BlueprintRecord({ sides: Side.BOTTOM | Side.RIGHT | Side.TOP })
	]
]);

const charactersPosition: CharactersPosition = iMap<Role, Point>().withMutations(m =>
	m.set(Role.PONY, new Point({ x: 1, y: 1 })).set(Role.DOMOKUN, new Point({ x: 2, y: 0 }))
);

const rainbowPathOne: RainbowPath = [{ x: 0, y: 0, direction: Direction.NORTH }];
const rainbowPathTwo: RainbowPath = [
	{ x: 0, y: 0, direction: Direction.SOUTH },
	{ x: 0, y: 1, direction: Direction.EAST }
];

describe('maze_helper', () => {
	describe('has side', () => {
		it('should return true while checking bottom of upper cell relative cell where Side.TOP is set', () => {
			expect(hasSide(blueprint, 1, 0, 3, 3, Side.BOTTOM)).toBeTruthy();
		});

		it('should return true while checking Side.LEFT in cell where it was set', () => {
			expect(hasSide(blueprint, 1, 0, 3, 3, Side.LEFT)).toBeTruthy();
		});

		it('should return false if there is no side', () => {
			expect(hasSide(blueprint, 0, 0, 3, 3, Side.BOTTOM)).toBeFalsy();
		});
	});

	describe('get border connections', () => {
		it('should return correct connection', () => {
			expect(getBorderConnections(blueprint, 1, 0, 3, 3)).toBe(BorderConnection.BOTTOM_LEFT);
		});
	});

	describe('get role', () => {
		it('should return pony if pony is in cell', () => {
			expect(getRole(charactersPosition, 1, 1)).toBe(Role.PONY);
		});

		it('should return none if noone is in cell', () => {
			expect(getRole(charactersPosition, 0, 0)).toBe(Role.NONE);
		});
	});

	describe('get rainbow type', () => {
		it('should return none if path is empty', () => {
			expect(getRainbowType([], 1, 2)).toBe(RainbowType.NONE);
		});

		it('should return vertical when path is one vector to south', () => {
			expect(getRainbowType(rainbowPathOne, 0, 0)).toBe(RainbowType.VERTICAL);
		});

		it('should return west_to_north when going from south to east', () => {
			expect(getRainbowType(rainbowPathTwo, 0, 1)).toBe(RainbowType.WEST_TO_NORTH);
		});

		it('should return vertical when path length is 2 and first vector is directed to south', () => {
			expect(getRainbowType(rainbowPathTwo, 0, 0)).toBe(RainbowType.VERTICAL);
		});

		it('should return none for points that do not belong to path', () => {
			expect(getRainbowType(rainbowPathTwo, 0, 2)).toBe(RainbowType.NONE);
		});
	});
});
