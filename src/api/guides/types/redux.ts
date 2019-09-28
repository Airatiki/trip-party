import { IToPost, IGuide } from './instance';
import { ACTIONS_TYPES } from '../constants';


export interface IState {
    data: IGuide[];
    isLoaded: boolean;
    error: null | object;
}

export interface IGetAction {
    type: ACTIONS_TYPES.GET_GUIDES;
    filters: {
        id?: string;
    };
}

export interface IGetSucceedAction {
    type: ACTIONS_TYPES.GET_GUIDES_SUCCEED;
    guides?: IGuide[];
    error?: object;
}

export interface IPostAction {
    type: ACTIONS_TYPES.POST_GUIDE;
    guide: IToPost;
}

export interface IPostSucceedAction {
    type: ACTIONS_TYPES.POST_GUIDE_SUCCEED;
    guide?: IGuide;
    error?: object;
}

export type IReduxAction =
    IGetAction |
    IGetSucceedAction |
    IPostAction |
    IPostSucceedAction;
