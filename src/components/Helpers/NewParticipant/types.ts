import { IParticipant } from 'api/participants/types/instance';
import {IProfile} from "../../../api/profile/types/instance";

export interface IReduxInjectedState {
    profile: IProfile;
}
export interface IReduxInjectedDispatch {
    accept(participant: IParticipant, orgId: string): void;
    reject(participant: IParticipant, orgId: string): void;
}

export interface IProps extends IReduxInjectedState, IReduxInjectedDispatch {
    participant: IParticipant;
}
