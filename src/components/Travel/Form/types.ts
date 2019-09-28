import { IToPut, ITravel } from 'api/travels/types/instance';
import { VISIBILITY } from 'api/travels/constants';


export interface IProps {
    travel: ITravel;

    onSave(travel: IToPut): void;
}

export interface IState {
    name: string;
    description: string;
    place: string;
    visibility: VISIBILITY
    budget: string;
    startDate: Date;
    endDate: Date;
    showTicketCost: boolean;
    noNewPeople: boolean;
    chatLink: string;
}
