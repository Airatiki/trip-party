import { Dispatch } from 'redux';
import { ACTIONS_TYPES } from './constants';
import { IParticipant, IToPost, IToPut } from './types/instance';
import * as NSRedux from './types/redux';


export function postToTravel(dispatch: Dispatch) {
    return function(participant: IToPost): void {
        const action: NSRedux.IPostToTravelAction = {
            type: ACTIONS_TYPES.POST_PARTICIPANT_TO_TRAVEL,
            participant,
        };
        dispatch(action);
    };
}

export function postToEvent(dispatch: Dispatch) {
    return function(participant: IToPost): void {
        const action: NSRedux.IPostToEventAction = {
            type: ACTIONS_TYPES.POST_PARTICIPANT_TO_EVENT,
            participant,
        };
        dispatch(action);
    };
}

export function putToTravel(dispatch: Dispatch) {
    return function(participant: IToPut): void {
        const action: NSRedux.IPutToTravelAction = {
            type: ACTIONS_TYPES.PUT_PARTICIPANT_TO_TRAVEL,
            participant,
        };
        dispatch(action);
    };
}

export function putToEvent(dispatch: Dispatch) {
    return function(participant: IToPut): void {
        const action: NSRedux.IPutToEventAction = {
            type: ACTIONS_TYPES.PUT_PARTICIPANT_TO_EVENT,
            participant,
        };
        dispatch(action);
    };
}

export function removeFromTravel(dispatch: Dispatch) {
    return function(participant: IParticipant): void {
        const action: NSRedux.IRemoveFromTravelAction = {
            type: ACTIONS_TYPES.REMOVE_PARTICIPANT_FROM_TRAVEL,
            participant,
        };
        dispatch(action);
    };
}

export function removeFromEvent(dispatch: Dispatch) {
    return function(participant: IParticipant): void {
        const action: NSRedux.IRemoveFromEventAction = {
            type: ACTIONS_TYPES.REMOVE_PARTICIPANT_FROM_EVENT,
            participant,
        };
        dispatch(action);
    };
}
