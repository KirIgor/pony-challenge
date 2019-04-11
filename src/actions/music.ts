import { ActionCreator } from 'redux';

// action types
export const TOGGLE_MUSIC = 'TOGGLE_MUSIC';
export type TOGGLE_MUSIC = typeof TOGGLE_MUSIC;

// actions

export interface ToggleMusic {
	type: TOGGLE_MUSIC;
}

export type MusicAction = ToggleMusic;

// action creators

export const toggleMusic: ActionCreator<ToggleMusic> = () => ({ type: TOGGLE_MUSIC });
