import { IState as ITravelsState, IReduxAction as ITravelsReduxAction } from './travels/types/redux';
import { IState as IProfileState, IReduxAction as IProfileReduxAction } from './profile/types/redux';
import { IReduxAction as IParticipantReduxAction } from './participants/types/redux';
import { IState as IGuidesState, IReduxAction as IGuidesReduxAction } from './guides/types/redux';


export interface IReduxState {
    profile: IProfileState,
    travels: ITravelsState,
    guides: IGuidesState,
}

export type IReduxAction =
    IProfileReduxAction |
    ITravelsReduxAction |
    IParticipantReduxAction |
    IGuidesReduxAction;
