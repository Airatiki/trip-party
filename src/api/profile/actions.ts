import { Dispatch } from 'redux';
import { IReduxState } from '../types';
import { ACTIONS_TYPES } from './constants';
import { IToPut } from './types/instance';
import * as NSRedux from './types/redux';


export function getState({profile}: IReduxState) {
    return profile.data;
}

export function getError({profile}: IReduxState) {
    return profile.error;
}

export function isLoaded({profile}: IReduxState) {
    return profile.isLoaded;
}

export function get(dispatch: Dispatch) {
    return function(): void {
        const action: NSRedux.IGetAction = {
            type: ACTIONS_TYPES.GET_PROFILE,
        };
        dispatch(action);
    };
}

export function put(dispatch: Dispatch) {
    return function(profile: IToPut): void {
        const action: NSRedux.IPutAction = {
            type: ACTIONS_TYPES.PUT_PROFILE,
            profile,
        };
        dispatch(action);
    };
}
