import { TAGS } from "../constants";


export interface IPlace {
    name: string;
    description: string;
    photo: string;
    lat: string;
    lng: string;
}

export interface IGuide {
    id: string;
    name: string;
    description: string;
    city: string;
    authorId: string;
    likes: number;
    budget: string;
    donateLink: string;
    places: IPlace[];
    tags: TAGS[];
}

export interface IToPost {
    name: string;
    description: string;
    city: string;
    authorId: string;
    likes: number;
    budget: string;
    donateLink: string;
    places: IPlace[];
    tags: TAGS[];
}
