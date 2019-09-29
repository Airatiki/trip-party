import { IGet, IPost, IPostLike } from './types/fetchResult';
import { IToPost, IToPostLike } from './types/instance';
import * as NSRedux from './types/redux';
// import { TAGS } from "./constants";
import {API_URL} from "../../helpers";


export default {
    async get(filters: NSRedux.IGetAction['filters']): Promise<IGet> {
        console.log(filters, 'FILTER');
        const tags = [];
        if (filters.tags && filters.tags.length) {
            for (let i = 0; i < filters.tags.length; i++) {
                tags.push({hashtag_id: i, name: filters.tags[i]})
            }
        }
        let response = await fetch(`${API_URL}/guide/get`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                guide_id: Number(filters.id), city: filters.city, budget: filters.budget, hashtags: tags})
        });

        response = await response.json();
        const guides = (response as any).result;
        console.log('Guides', guides);
        if (guides && !guides.length) {
            return {guides: []}
        }

        const newGuides = guides.map((guide: any) => {
            return {
                id: guide.guide_id,
                name: guide.name,
                description: guide.description,
                city: guide.city,
                authorId: guide.creator_id,
                likes: guide.likes,
                budget: guide.budget,
                hasBeenLiked: false,
                tags: guide.hashtags.map((el: any) => el.name),
                places: guide.locations.map((location: any) => {
                    return {
                        name: location.name,
                        description: location.description,
                        photo: location.photo,
                        lat: location.geo_point.split(';')[0],
                        lng: location.geo_point.split(';')[1]
                    }
                })
            }
        });
        console.log('GAAAY', newGuides);

        return {guides: newGuides};
    },

    async post(guide: IToPost): Promise<IPost> {
        let request = await fetch(`${API_URL}/guide/create`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                creator_id: guide.authorId,
                name: guide.name,
                description: guide.description,
                city: guide.city,
                budget: guide.budget,
                likes: guide.likes,
                hashtags: guide.tags.map((tag) => ({name: tag})),
                locations: guide.places.map((place) => {
                    return {
                        name: place.name,
                        description: place.description,
                        photo: place.photo,
                        geo_point: `${place.lat};${place.lng}`
                    }
                })
            })
        });

        request = await request.json();

        const newGuide = (request as any).result;

        return {
            guide: {
                id: newGuide.guide_id,
                hasBeenLiked: false,
                ...guide,
            }
        }
    },

    async postLike(data: IToPostLike): Promise<IPostLike> {
        await fetch(`${API_URL}/guide/like?guide_id=${data.id}&like=${data.isLiked}`);

        return {
            data: {
                ...data,
                isLiked: !data.isLiked
            }
        }
    },
}
