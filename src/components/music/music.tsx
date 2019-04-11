import * as React from 'react';

import './music.css';

interface Props {}

const Music = React.memo(({  }: Props) => {
	return (
		<div>
			<iframe src="music/silence.mp3" allow="autoplay" id="audio" style={{ display: 'none' }} />
			<audio id="music" autoPlay src="music/bundle.mp3" />
		</div>
	);
});

export default Music;
