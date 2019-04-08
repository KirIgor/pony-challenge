import * as React from 'react';
import { Link } from 'react-router-dom';
import * as Routes from '../constants/routes.json';

import './hello.css';

interface Props {}

const Hello = React.memo(({  }: Props) => {
	return (
		<div className="hello-container">
			Hello, %username%!
			<Link to={Routes.NEW_GAME}>Play</Link>
		</div>
	);
});

export default Hello;
