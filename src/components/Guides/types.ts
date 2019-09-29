import * as NSRedux from 'api/travels/types/redux';
import {IProfile} from "../../api/profile/types/instance";
import { IGuide } from "../../api/guides/types/instance";


export interface IProps {
    guides: IGuide[];
    profile: IProfile;
    error: object | null;
    isLoaded: boolean;
    history: {
        push(path: string): void;
        goBack(): void;
    };
    get(filters: NSRedux.IGetAction['filters'], friends: string[], ownerId: string): void;
}
