import * as React from 'react';

import './loadable.css';

interface Props {
	load: Promise<any>;
	children: React.ReactNode;
}

const Loadable = React.memo(({ load, children }: Props) => {
	const [isLoading, setLoading] = React.useState(true);

	React.useEffect(() => {
		load.then(() => setLoading(false));
	}, []);

	return isLoading ? (
		<div className="spinner-container">
			<img
				src="https://loading.io/spinners/azure/index.azure-round-loader.svg"
				className="spinner-image"
			/>
		</div>
	) : (
		<React.Fragment>{children}</React.Fragment>
	);
});

export default Loadable;
