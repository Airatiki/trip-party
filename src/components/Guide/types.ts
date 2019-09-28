import { IGuide } from "api/guides/types/instance";
import { IGetAction } from "api/guides/types/redux";


export interface IReduxInjectedState {
    guide?: IGuide;
}

export interface IReduxInjectedDispatch {
    get(filters: IGetAction['filters']): void;
}

export interface IOwnProps {
    match: {
        params: {
            id: string;
        };
    };
}

export interface IProps extends IReduxInjectedState, IReduxInjectedDispatch, IOwnProps {}
