import { ActionCreator } from 'redux';

// action types
export const ADD_WINS = 'ADD_WINS';
export type ADD_WINS = typeof ADD_WINS;

export const ADD_LOSES = 'ADD_LOSES';
export type ADD_LOSES = typeof ADD_LOSES;

// actions

export interface AddWins {
	type: ADD_WINS;
}

export interface AddLoses {
	type: ADD_LOSES;
}

export type StatisticAction = AddWins | AddLoses;

// action creators

export const addWins: ActionCreator<AddWins> = () => ({ type: ADD_WINS });
export const addLoses: ActionCreator<AddLoses> = () => ({ type: ADD_LOSES });
