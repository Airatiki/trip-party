import { ITravel } from 'api/travels/types/instance';
import * as NSRedux from 'api/travels/types/redux';
import {IProfile} from "../../api/profile/types/instance";


export interface IProps {
    travels: ITravel[];
    profile: IProfile;
    error: object | null;
    isLoaded: boolean;
    get(filters: NSRedux.IGetAction['filters'], friends: string[], ownerId: string): void;
}
