import { IParticipant } from 'api/participants/types/instance';

import { VISIBILITY } from '../constants';


export interface IEvent {
    id: string;
    name: string;
    description: string;
    visibility: VISIBILITY;
    startDate: Date;
    time: string;
    place: string;
    chat: string;
    participants: IParticipant[];
}

export interface IToPost {
    name: string;
    description: string;
    visibility: VISIBILITY;
    startDate: Date;
    time: string;
    place: string;
}

export interface IToPut {
    id: string;
    name: string;
    description: string;
    visibility: VISIBILITY;
    startDate: Date;
    time: string;
    place: string;
    chat: string;
}
