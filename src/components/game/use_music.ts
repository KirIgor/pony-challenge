import * as React from 'react';

// const musicList = [
// 	'music/A True True Friend - MLP FiM Song [1080p] MP3.mp3',
// 	'music/Japanese Smile Song - My Little Pony FiM S2E18 [Lyrics].mp3',
// 	'music/My Little Pony_ Friendship is Magic - Raise This Barn [1080p].mp3'
// ];

const musicList = [new Audio('sound/it_worked.mp3'), new Audio('sound/we_need_you_help.mp3')];

const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;

const playNext = () => {
	const audio = musicList[getRandomInt(0, musicList.length)];
	// audio.addEventListener('ended', () => {
	// 	audio.currentTime = 0;
	// 	playNext();
	// });
	audio.play();
};

export default function useMusic() {
	console.log(123);
	React.useEffect(() => {
		playNext();
	}, []);
}
