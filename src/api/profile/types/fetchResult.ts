import { IProfile } from './instance';


export interface IGet {
    profile?: IProfile;
    error?: object;
}

export interface IPut {
    profile?: IProfile;
    error?: object;
}
