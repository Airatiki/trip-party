import { IToPost } from 'api/travels/types/instance';
import { VISIBILITY } from 'api/travels/constants';
import { IProfile } from "api/profile/types/instance";
import { IGuide } from "api/guides/types/instance";


export interface IReduxInjectedState {
    profile: IProfile;
    guides: IGuide[];
}

export interface IReduxInjectedDispatch {
    post(travel: IToPost): void;
}

export interface IProps extends IReduxInjectedState, IReduxInjectedDispatch {
    location: {
        state?: {
            guideId?: string;
        };
    };
    history: {
        push(path: string): void;
    };
}

export interface IState {
    name: string;
    startDate: Date;
    endDate: Date;
    description: string;
    visibility: VISIBILITY;
    showTicketCost: boolean;
    chatLink: string;
}
