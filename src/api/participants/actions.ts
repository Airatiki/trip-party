import { Dispatch } from 'redux';
import { ACTIONS_TYPES } from './constants';
import { IParticipant, IToPost, IToPostNew } from './types/instance';
import * as NSRedux from './types/redux';


export function postNew(dispatch: Dispatch) {
    return function(participant: IToPostNew): void {
        const action: NSRedux.IPostNewAction = {
            type: ACTIONS_TYPES.POST_NEW_PARTICIPANT,
            participant,
        };
        dispatch(action);
    }
}

export function post(dispatch: Dispatch) {
    return function(participant: IToPost): void {
        const action: NSRedux.IPostAction = {
            type: ACTIONS_TYPES.POST_PARTICIPANT,
            participant,
        };
        dispatch(action);
    };
}

export function removeNew(dispatch: Dispatch) {
    return function(participant: IParticipant): void {
        const action: NSRedux.IRemoveNewAction = {
            type: ACTIONS_TYPES.REMOVE_NEW_PARTICIPANT,
            participant,
        };
        dispatch(action);
    };
}

export function remove(dispatch: Dispatch) {
    return function(participant: IParticipant): void {
        const action: NSRedux.IRemoveAction = {
            type: ACTIONS_TYPES.REMOVE_PARTICIPANT,
            participant,
        };
        dispatch(action);
    };
}
