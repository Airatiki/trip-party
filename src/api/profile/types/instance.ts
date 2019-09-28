import { VISIBILITY } from 'api/travels/constants';


export interface IProfile {
    id: string;
    VkId: string;
    friends: string[];
    travelsVisibility: VISIBILITY;
    travelsAnonymity: boolean;
}

export interface IToPut {
    id: string;
    VkId: string;
    friends: string[];
    travelsVisibility: VISIBILITY;
    travelsAnonymity: boolean;
}
