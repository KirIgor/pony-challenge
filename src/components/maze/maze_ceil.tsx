import * as React from 'react';
// import classNames from 'classnames';

import { Role, Side, PonyName, BorderConnection } from '../../types/index';

import CeilRole from './ceil_role';

import './maze_ceil.css';

// sides is bitwise OR of Side
// borderRadius is bitwise OR of BorderConnection
interface Props {
	sides: number;
	role: Role;
	ponyName: PonyName;
	borderConnections: number;
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

export default function MazeCeil({ sides, borderConnections, ponyName, role = Role.NONE }: Props) {
	return (
		<div className="ceil">
			{renderBorders(sides)}
			{renderBorderConnections(borderConnections)}
			<CeilRole ponyName={ponyName} role={role} />
		</div>
	);
}

const isSide = (sides: number, side: Side): boolean => (sides & side) != 0;
const isBorderConnection = (
	borderConnections: number,
	borderConnection: BorderConnection
): boolean => (borderConnections & borderConnection) != 0;
