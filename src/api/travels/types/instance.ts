import { IParticipant } from 'api/participants/types/instance';

import { VISIBILITY } from '../constants';


export interface ITravel {
    id: string;
    guideId: string;
    authorId: string;
    name: string;
    description: string;
    place: string;
    visibility: VISIBILITY;
    startDate: Date;
    endDate: Date;
    budget: string;
    demoParticipants?: string[];
    showTicketCost: boolean;
    participants: IParticipant[];
    newParticipants: IParticipant[];
    noNewPeople: boolean;
    chatLink: string;
}

export interface IToPost {
    guideId: string;
    authorId: string;
    name: string;
    description: string;
    place: string;
    visibility: VISIBILITY;
    startDate: Date;
    endDate: Date;
    budget: string;
    showTicketCost: boolean;
    chatLink: string;
}

export interface IToPut {
    id: string;
    name: string;
    description: string;
    place: string;
    visibility: VISIBILITY;
    startDate: Date;
    endDate: Date;
    budget: string;
    showTicketCost: boolean;
    noNewPeople: boolean;
    chatLink: string;
}
