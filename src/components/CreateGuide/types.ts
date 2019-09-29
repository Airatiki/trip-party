import { IProfile } from "api/profile/types/instance";
import { IGuide, IPlace, IToPost } from "api/guides/types/instance";
import { TAGS } from "api/guides/constants";


export interface IReduxInjectedState {
    profile: IProfile;
    guides: IGuide[];
}

export interface IReduxInjectedDispatch {
    post(guide: IToPost): void;
}

export interface IProps extends IReduxInjectedState, IReduxInjectedDispatch {
    history: {
        goBack(): void;
        push(path: string): void;
    }
}

export interface IState {
    name: string;
    description: string;
    city: string;
    likes: number;
    budget: string;
    places: IPlace[];
    tags: TAGS[];
    searchList: [];
}
