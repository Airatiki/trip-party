import { Dispatch } from 'redux';
import { IReduxState } from '../types';
import { ACTIONS_TYPES } from './constants';
import { IToPost, IToPostLike } from './types/instance';
import * as NSRedux from './types/redux';


export function getState({guides}: IReduxState) {
    return guides.data;
}

export function getError({guides}: IReduxState) {
    return guides.error;
}

export function isLoaded({guides}: IReduxState) {
    return guides.isLoaded;
}

export function get(dispatch: Dispatch) {
    return function(filters: NSRedux.IGetAction['filters']): void {
        const action: NSRedux.IGetAction = {
            type: ACTIONS_TYPES.GET_GUIDES,
            filters,
        };
        dispatch(action);
    };
}

export function post(dispatch: Dispatch) {
    return function(guide: IToPost): void {
        const action: NSRedux.IPostAction = {
            type: ACTIONS_TYPES.POST_GUIDE,
            guide,
        };
        dispatch(action);
    };
}

export function postLike(dispatch: Dispatch) {
    return function(data: IToPostLike): void {
        const action: NSRedux.IPostLikeAction = {
            type: ACTIONS_TYPES.POST_GUIDE_LIKE,
            data,
        };
        dispatch(action);
    };
}
