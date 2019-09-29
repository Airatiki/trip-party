import {IGuide} from "../../../api/guides/types/instance";

export interface IProps {
    guide: IGuide;
    history: {
        push(path: string): void;
    }
}
