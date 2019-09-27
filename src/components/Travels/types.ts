import { ITravel } from 'api/travels/types/instance';
import * as NSRedux from 'api/travels/types/redux';


export interface IProps {
    travels: ITravel[];
    error: object | null;
    isLoaded: boolean;
    get(filters: NSRedux.IGetAction['filters']): void;
}
