import {ITravel} from "../../../api/travels/types/instance";

export interface IProps {
    friends: string[];
    travel: ITravel;
    history: {
        push(path: string): void;
    }
}
