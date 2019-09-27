import { IEvent } from './instance';


export interface IGet {
    events?: IEvent[];
    error?: object;
}

export interface IPost {
    event?: IEvent;
    error?: object;
}

export interface IPut {
    event?: IEvent;
    error?: object;
}
