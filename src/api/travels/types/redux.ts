import { IToPost, IToPut, ITravel } from './instance';
import { ACTIONS_TYPES } from '../constants';


export interface IState {
    data: ITravel[],
    isLoaded: boolean,
    error: null | object;
}

export interface IGetAction {
    type: ACTIONS_TYPES.GET_TRAVELS,
    filters: {
        id?: string;
    },
    friends: string[],
    ownerId: string
}

export interface IGetSucceedAction {
    type: ACTIONS_TYPES.GET_TRAVELS_SUCCEED,
    travels?: ITravel[],
    error?: object,
}

export interface IPostAction {
    type: ACTIONS_TYPES.POST_TRAVEL,
    travel: IToPost,
}

export interface IPostSucceedAction {
    type: ACTIONS_TYPES.POST_TRAVEL_SUCCEED,
    travel?: ITravel,
    error?: object;
}

export interface IPutAction {
    type: ACTIONS_TYPES.PUT_TRAVEL,
    travel: IToPut,
}

export interface IPutSucceedAction {
    type: ACTIONS_TYPES.PUT_TRAVEL_SUCCEED,
    travel?: IToPut,
    error?: object;
}

export type IReduxAction =
    IGetAction |
    IGetSucceedAction |
    IPostAction |
    IPostSucceedAction |
    IPutAction |
    IPutSucceedAction;
