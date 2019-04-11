import { MusicState } from '../types/index';
import { MusicAction, TOGGLE_MUSIC } from '../actions/music';

export const defaultMusicState = new MusicState({
	playing: true
});

const musicReducer = (state: MusicState = defaultMusicState, action: MusicAction): MusicState => {
	switch (action.type) {
		case TOGGLE_MUSIC: {
			return state.update('playing', playing => {
				const res = !playing;

				if (res) {
					(document.getElementById('music') as HTMLAudioElement).play();
				} else {
					(document.getElementById('music') as HTMLAudioElement).pause();
				}

				return res;
			}) as MusicState;
		}
		default:
			return state;
	}
};

export default musicReducer;
