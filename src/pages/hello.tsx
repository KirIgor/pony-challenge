import * as React from 'react';
import { Link } from 'react-router-dom';
import * as Routes from '../constants/routes.json';

import './hello.css';

interface Props {}

const Hello = React.memo(({  }: Props) => {
	return (
		<div className="hello-container">
			<div className="hello-items">
				<div>Hello, %username%!</div>
				<div>
					<Link to={Routes.NEW_GAME}>Play</Link>
				</div>
			</div>
		</div>
	);
});

export default Hello;
