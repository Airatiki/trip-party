import { IParticipant } from './instance';


export interface IPostNew {
    participant?: IParticipant;
    error?: object;
}

export interface IPost {
    participant?: IParticipant;
    error?: object;
}

export interface IRemoveNew {
    participant?: IParticipant;
    error?: object;
}

export interface IRemove {
    participant?: IParticipant;
    error?: object;
}
