import { IState as ITravelsState, IReduxAction as ITravelsReduxAction } from './travels/types/redux';
import { IState as IEventsState, IReduxAction as IEventsReduxAction } from './events/types/redux';
import { IState as IProfileState, IReduxAction as IProfileReduxAction } from './profile/types/redux';
import { IReduxAction as IParticipantReduxAction } from './participants/types/redux';


export interface IReduxState {
    profile: IProfileState,
    travels: ITravelsState,
    events: IEventsState,
}

export type IReduxAction =
    IProfileReduxAction |
    ITravelsReduxAction |
    IEventsReduxAction |
    IParticipantReduxAction;
