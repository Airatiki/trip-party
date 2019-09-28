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
    authorId: string;
    name: string;
    description: string;
    city: string;
    likes: number;
    hasBeenLiked: boolean;
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

export interface IToPostLike {
    id: string;
    userId: string;
    isLiked: boolean;
}
