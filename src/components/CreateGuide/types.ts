import { IProfile } from "api/profile/types/instance";
import { IPlace, IToPost } from "api/guides/types/instance";
import { TAGS } from "api/guides/constants";


export interface IReduxInjectedState {
    profile: IProfile;
}

export interface IReduxInjectedDispatch {
    post(guide: IToPost): void;
}

export interface IProps extends IReduxInjectedState, IReduxInjectedDispatch {}

export interface IState {
    name: string;
    description: string;
    city: string;
    likes: number;
    budget: string;
    places: IPlace[];
    tags: TAGS[];
}
