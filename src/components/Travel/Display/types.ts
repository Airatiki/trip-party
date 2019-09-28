import { ITravel } from 'api/travels/types/instance';


export interface IProps {
    isAdmin: boolean;
    travel: ITravel

    onEdit(): void;
}
