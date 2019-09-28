import { IGuide, IToPostLike } from './instance';


export interface IGet {
    guides?: IGuide[];
    error?: object;
}

export interface IPost {
    guide?: IGuide;
    error?: object;
}

export interface IPostLike {
    data?: IToPostLike;
    error?: object;
}
