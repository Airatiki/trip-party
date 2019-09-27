import { IToPost, IToPut, IEvent } from './instance';
import { ACTIONS_TYPES } from '../constants';


export interface IState {
    data: IEvent[],
    isLoaded: boolean,
    error: null | object;
}

export interface IGetAction {
    type: ACTIONS_TYPES.GET_EVENTS,
    filters: {
        city?: string,
        date?: Date,
    }
}

export interface IGetSucceedAction {
    type: ACTIONS_TYPES.GET_EVENTS_SUCCEED,
    events?: IEvent[],
    error?: object,
}

export interface IPostAction {
    type: ACTIONS_TYPES.POST_EVENT,
    event: IToPost,
}

export interface IPostSucceedAction {
    type: ACTIONS_TYPES.POST_EVENT_SUCCEED,
    event?: IEvent,
    error?: object;
}

export interface IPutAction {
    type: ACTIONS_TYPES.PUT_EVENT,
    event: IToPut,
}

export interface IPutSucceedAction {
    type: ACTIONS_TYPES.PUT_EVENT_SUCCEED,
    event?: IToPut,
    error?: object;
}

export type IReduxAction =
    IGetAction |
    IGetSucceedAction |
    IPostAction |
    IPostSucceedAction |
    IPutAction |
    IPutSucceedAction;
