import { IToPost } from 'api/travels/types/instance';
import { VISIBILITY } from 'api/travels/constants';


export interface IReduxInjectedDispatch {
    post(travel: IToPost): void;
}

export interface IProps extends IReduxInjectedDispatch {}

export interface IState {
    name: string;
    startDate: Date;
    endDate: Date;
    description: string;
    place: string;
    visibility: VISIBILITY;
    budget: string;
    showTicketCost: boolean;
}
