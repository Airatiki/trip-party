import { IParticipant } from 'api/participants/types/instance';


export interface IReduxInjectedDispatch {
    remove(participant: IParticipant): void;
}

export interface IProps extends IReduxInjectedDispatch {
    participant: IParticipant;
    occasionAuthorId: string;
}

export interface IState {

}
