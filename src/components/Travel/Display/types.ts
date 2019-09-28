import { ITravel } from 'api/travels/types/instance';
import { IProfile } from 'api/profile/types/instance';
import { IToPostNew } from 'api/participants/types/instance';


export interface IReduxInjectedState {
    profile: IProfile;
}

export interface IReduxInjectedDispatch {
    postNew(participant: IToPostNew): void;
}

export interface IProps extends IReduxInjectedState, IReduxInjectedDispatch {
    travel: ITravel;

    onEdit(): void;
}
