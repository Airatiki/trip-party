import { ITravel } from './instance';


export interface IGet {
    travels?: ITravel[];
    error?: object;
}

export interface IPost {
    travel?: ITravel;
    error?: object;
}

export interface IPut {
    travel?: ITravel;
    error?: object;
}
