import * as React from 'react';
import * as Routes from '../constants/routes.json';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import './hello.css';

interface Props {}

const Hello = React.memo(({  }: Props) => {
	return (
		<div className="hello-container">
			<div className="hello-items">
				<div>Hello, %username%!</div>
				<div>
					<Link className="link-style" to={Routes.NEW_GAME}>
						<Button size="lg">Play</Button>
					</Link>
				</div>
			</div>
		</div>
	);
});

export default Hello;
