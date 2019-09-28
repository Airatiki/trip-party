import { VISIBILITY } from 'api/travels/constants';
import { IProfile, IToPut } from 'api/profile/types/instance';


export interface IReduxInjectedState {
    profile: IProfile;
    isLoaded: boolean;
    error: null | object;
}

export interface IReduxInjectedDispatch {
    get(): void;
    put(profile: IToPut): void;
}

export interface IProps extends IReduxInjectedState, IReduxInjectedDispatch {}

export interface IState {
    travelsVisibility: VISIBILITY;
    travelsAnonymity: boolean;
}
