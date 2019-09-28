import { IPlace } from "api/guides/types/instance";


export interface IProps {
    index: number;

    name: string;
    description: string;
    photo: string;
    lat: string;
    lng: string;

    onSave(index: number, place: IPlace): void;
    onRemove(index: number): void;
}

export interface IState {
    isShown: boolean;

    name: string;
    description: string;
    photo: string;
    lat: string;
    lng: string;
}
