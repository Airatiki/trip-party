import { IParticipant } from 'api/participants/types/instance';


export interface IReduxInjectedDispatch {
    accept(participant: IParticipant): void;
    reject(participant: IParticipant): void;
}

export interface IProps extends IReduxInjectedDispatch {
    participant: IParticipant;
}
