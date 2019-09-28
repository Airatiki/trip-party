import { IGuide, IToPostLike } from "api/guides/types/instance";
import { IGetAction } from "api/guides/types/redux";
import { IProfile } from "../../api/profile/types/instance";


export interface IReduxInjectedState {
    guide?: IGuide;
    profile: IProfile;
}

export interface IReduxInjectedDispatch {
    get(filters: IGetAction['filters']): void;
    postLike(data: IToPostLike): void;
}

export interface IOwnProps {
    match: {
        params: {
            id: string;
        };
    };
    history: {
        push(data: {pathname: string, state: object}): void;
    }
}

export interface IProps extends IReduxInjectedState, IReduxInjectedDispatch, IOwnProps {}
