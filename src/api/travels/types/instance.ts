import { IParticipant } from 'api/participants/types/instance';

import { VISIBILITY } from '../constants';


export interface ITravel {
    id: string;
    name: string;
    description: string;
    visibility: VISIBILITY,
    startDate: Date;
    endDate: Date;
    place: string;
    ticket: string;
    chat: string;
    participants: IParticipant[];
}

export interface IToPost {
    name: string;
    description: string;
    visibility: VISIBILITY,
    startDate: Date;
    endDate: Date;
    place: string;
    ticket: string;
}

export interface IToPut {
    id: string;
    name: string;
    description: string;
    visibility: VISIBILITY,
    startDate: Date;
    endDate: Date;
    place: string;
    ticket: string;
    chat: string;
}
