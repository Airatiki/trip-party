import { IToPost, IToPostNew, IParticipant } from './instance';
import { ACTIONS_TYPES } from '../constants';


export interface IPostNewAction {
    type: ACTIONS_TYPES.POST_NEW_PARTICIPANT;
    participant: IToPostNew;
}

export interface IPostNewSucceedAction {
    type: ACTIONS_TYPES.POST_NEW_PARTICIPANT_SUCCEED;
    participant?: IParticipant;
    error?: object;
}

export interface IPostAction {
    type: ACTIONS_TYPES.POST_PARTICIPANT,
    participant: IToPost,
    orgId: string;
}

export interface IPostSucceedAction {
    type: ACTIONS_TYPES.POST_PARTICIPANT_SUCCEED,
    participant?: IParticipant,
    error?: object;
}

export interface IRemoveNewAction {
    type: ACTIONS_TYPES.REMOVE_NEW_PARTICIPANT,
    participant: IParticipant;
    orgId: string;
}

export interface IRemoveNewSucceedAction {
    type: ACTIONS_TYPES.REMOVE_NEW_PARTICIPANT_SUCCEED,
    participant?: IParticipant;
    error?: object;
}

export interface IRemoveAction {
    type: ACTIONS_TYPES.REMOVE_PARTICIPANT,
    participant: IParticipant;
    orgId: string;
}

export interface IRemoveSucceedAction {
    type: ACTIONS_TYPES.REMOVE_PARTICIPANT_SUCCEED,
    participant?: IParticipant;
    error?: object;
}

export type IReduxAction =
    IPostNewAction |
    IPostNewSucceedAction |
    IPostAction |
    IPostSucceedAction |
    IRemoveNewAction |
    IRemoveNewSucceedAction |
    IRemoveAction |
    IRemoveSucceedAction;
