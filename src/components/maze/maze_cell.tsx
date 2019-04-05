import * as React from 'react';
// import classNames from 'classnames';

import { Role, Side, PonyName, BorderConnection, RainbowType } from '../../types/index';

import CellRole from './cell_role';

import './maze_cell.css';

// sides is bitwise OR of Side
// borderRadius is bitwise OR of BorderConnection
interface Props {
	sides: number;
	role: Role;
	ponyName: PonyName;
	borderConnections: number;
	rainbowType: RainbowType;
}

const renderBorders = (sides: number) => {
	return (
		<React.Fragment>
			{isSide(sides, Side.LEFT) && <div className="left" />}
			{isSide(sides, Side.RIGHT) && <div className="right" />}
			{isSide(sides, Side.TOP) && <div className="top" />}
			{isSide(sides, Side.BOTTOM) && <div className="bottom" />}
		</React.Fragment>
	);
};

const renderBorderConnections = (borderConnections: number) => {
	return (
		<React.Fragment>
			{isBorderConnection(borderConnections, BorderConnection.TOP_LEFT) && (
				<div className="top_left" />
			)}
			{isBorderConnection(borderConnections, BorderConnection.TOP_RIGHT) && (
				<div className="top_right" />
			)}
			{isBorderConnection(borderConnections, BorderConnection.BOTTOM_LEFT) && (
				<div className="bottom_left" />
			)}
			{isBorderConnection(borderConnections, BorderConnection.BOTTOM_RIGHT) && (
				<div className="bottom_right" />
			)}
		</React.Fragment>
	);
};

const renderRainbow = (rainbowType: RainbowType) => {
	switch (rainbowType) {
		case RainbowType.HORIZONTAL: {
			return <div className="rainbow_horizontal" />;
		}
		case RainbowType.VERTICAL: {
			return <div className="rainbow_vertical" />;
		}
		case RainbowType.NORTH_TO_EAST: {
			return <div className="rainbow_north_to_east" />;
		}
		case RainbowType.EAST_TO_SOUTH: {
			return <div className="rainbow_east_to_south" />;
		}
		case RainbowType.SOUTH_TO_WEST: {
			return <div className="rainbow_south_to_west" />;
		}
		case RainbowType.WEST_TO_NORTH: {
			return <div className="rainbow_west_to_north" />;
		}
		case RainbowType.NONE: {
			return null;
		}
	}
};

export default function MazeCell({
	sides,
	rainbowType,
	borderConnections,
	ponyName,
	role = Role.NONE
}: Props) {
	return (
		<div className="cell">
			{renderBorders(sides)}
			{renderBorderConnections(borderConnections)}
			{renderRainbow(rainbowType)}
			<CellRole ponyName={ponyName} role={role} />
		</div>
	);
}

const isSide = (sides: number, side: Side): boolean => (sides & side) != 0;
const isBorderConnection = (
	borderConnections: number,
	borderConnection: BorderConnection
): boolean => (borderConnections & borderConnection) != 0;
