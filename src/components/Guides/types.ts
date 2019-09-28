import { IGuide } from "api/guides/types/instance";
import { IGetAction } from "api/guides/types/redux";


export interface IReduxInjectedState {
    guides: IGuide[];
    isLoaded: boolean;
    error: object | null;
}

export interface IReduxInjectedDispatch {
    get(filters: IGetAction['filters']): void;
}

export interface IProps extends IReduxInjectedState, IReduxInjectedDispatch {

}
