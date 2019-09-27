import { IToPut, IProfile } from './instance';
import { ACTIONS_TYPES } from '../constants';


export interface IState {
    data: IProfile,
    isLoaded: boolean,
    error: null | object;
}

export interface IGetAction {
    type: ACTIONS_TYPES.GET_PROFILE,
}

export interface IGetSucceedAction {
    type: ACTIONS_TYPES.GET_PROFILE_SUCCEED,
    profile?: IProfile,
    error?: object,
}

export interface IPutAction {
    type: ACTIONS_TYPES.PUT_PROFILE,
    profile: IToPut,
}

export interface IPutSucceedAction {
    type: ACTIONS_TYPES.PUT_PROFILE_SUCCEED,
    profile?: IToPut,
    error?: object;
}

export type IReduxAction =
    IGetAction |
    IGetSucceedAction |
    IPutAction |
    IPutSucceedAction;
