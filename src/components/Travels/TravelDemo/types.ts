import {ITravel} from "../../../api/travels/types/instance";

export interface IProps {
    travel: ITravel;
    history: {
        push(path: string): void;
    }
}
