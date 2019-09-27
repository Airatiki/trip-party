import { IToPost, IToPut, IParticipant } from './instance';
import { ACTIONS_TYPES } from '../constants';


export interface IPostToTravelAction {
    type: ACTIONS_TYPES.POST_PARTICIPANT_TO_TRAVEL,
    participant: IToPost,
}

export interface IPostToTravelSucceedAction {
    type: ACTIONS_TYPES.POST_PARTICIPANT_TO_TRAVEL_SUCCEED,
    participant?: IParticipant,
    error?: object;
}

export interface IPostToEventAction {
    type: ACTIONS_TYPES.POST_PARTICIPANT_TO_EVENT,
    participant: IToPost,
}

export interface IPostToEventSucceedAction {
    type: ACTIONS_TYPES.POST_PARTICIPANT_TO_EVENT_SUCCEED,
    participant?: IParticipant,
    error?: object;
}

export interface IPutToTravelAction {
    type: ACTIONS_TYPES.PUT_PARTICIPANT_TO_TRAVEL,
    participant: IToPut,
}

export interface IPutToTravelSucceedAction {
    type: ACTIONS_TYPES.PUT_PARTICIPANT_TO_TRAVEL_SUCCEED,
    participant?: IParticipant,
    error?: object;
}

export interface IPutToEventAction {
    type: ACTIONS_TYPES.PUT_PARTICIPANT_TO_EVENT,
    participant: IToPut,
}

export interface IPutToEventSucceedAction {
    type: ACTIONS_TYPES.PUT_PARTICIPANT_TO_EVENT_SUCCEED,
    participant?: IParticipant,
    error?: object;
}

export interface IRemoveFromTravelAction {
    type: ACTIONS_TYPES.REMOVE_PARTICIPANT_FROM_TRAVEL,
    participant: IParticipant;
}

export interface IRemoveFromTravelSucceedAction {
    type: ACTIONS_TYPES.REMOVE_PARTICIPANT_FROM_TRAVEL_SUCCEED,
    participant?: IParticipant;
    error?: object;
}

export interface IRemoveFromEventAction {
    type: ACTIONS_TYPES.REMOVE_PARTICIPANT_FROM_EVENT,
    participant: IParticipant;
}

export interface IRemoveFromEventSucceedAction {
    type: ACTIONS_TYPES.REMOVE_PARTICIPANT_FROM_EVENT_SUCCEED,
    participant?: IParticipant;
    error?: object;
}

export type IReduxAction =
    IPostToTravelAction |
    IPostToTravelSucceedAction |
    IPostToEventAction |
    IPostToEventSucceedAction |
    IPutToTravelAction |
    IPutToTravelSucceedAction |
    IPutToEventAction |
    IPutToEventSucceedAction |
    IRemoveFromTravelAction |
    IRemoveFromTravelSucceedAction |
    IRemoveFromEventAction |
    IRemoveFromEventSucceedAction;
