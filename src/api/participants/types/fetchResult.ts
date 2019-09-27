import { IParticipant } from './instance';


export interface IPost {
    participant?: IParticipant;
    error?: object;
}

export interface IPut {
    participant?: IParticipant;
    error?: object;
}

export interface IRemove {
    participant?: IParticipant;
    error?: object;
}
