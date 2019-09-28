import { IGuide } from './instance';


export interface IGet {
    guides?: IGuide[];
    error?: object;
}

export interface IPost {
    guide?: IGuide;
    error?: object;
}
