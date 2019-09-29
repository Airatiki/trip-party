import { Dispatch } from 'redux';
import { IReduxState } from '../types';
import { ACTIONS_TYPES } from './constants';
import { IToPost, IToPut, ITravel } from './types/instance';
import * as NSRedux from './types/redux';


export function getState({travels}: IReduxState) {
    return travels.data;
}

export function getError({travels}: IReduxState) {
    return travels.error;
}

export function isLoaded({travels}: IReduxState) {
    return travels.isLoaded;
}

export function get(dispatch: Dispatch) {
    return function(filters: NSRedux.IGetAction['filters'], friends: string[], ownerId: string): void {
        const action: NSRedux.IGetAction = {
            type: ACTIONS_TYPES.GET_TRAVELS,
            filters,
            friends,
            ownerId
        };
        dispatch(action);
    };
}

export function post(dispatch: Dispatch) {
    return function(travel: IToPost): void {
        const action: NSRedux.IPostAction = {
            type: ACTIONS_TYPES.POST_TRAVEL,
            travel,
        };
        dispatch(action);
    };
}

export function put(dispatch: Dispatch) {
    return function(travel: IToPut): void {
        const action: NSRedux.IPutAction = {
            type: ACTIONS_TYPES.PUT_TRAVEL,
            travel,
        };
        dispatch(action);
    };
}

export function setUserData(dispatch: Dispatch) {
    return function(travel: ITravel): void {
        const action: NSRedux.ISetUserDataAction = {
            type: ACTIONS_TYPES.SET_USER_DATA_TO_TRAVEL,
            travel,
        };
        dispatch(action);
    }
}
