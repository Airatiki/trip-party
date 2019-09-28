import { IToPut, ITravel } from 'api/travels/types/instance';
import { IProfile } from 'api/profile/types/instance';
import * as NSRedux from "../../api/travels/types/redux";


export interface IReduxInjectedState {
    travel?: ITravel;
    profile: IProfile;
}

export interface IReduxInjectedDispatch {
    get(filters: NSRedux.IGetAction['filters'], friends: string[], ownerId: string): void;
    put(travel: IToPut): void;
}

export interface IOwnProps {
    match: {
        params: {
            id: string;
        };
    };
}

export interface IProps extends IReduxInjectedState, IReduxInjectedDispatch, IOwnProps {
    history: {
        push(path: string): void;
    }
}

export interface IState {
    isForm: boolean;
}
