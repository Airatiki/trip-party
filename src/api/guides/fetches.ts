import { IGet, IPost, IPostLike } from './types/fetchResult';
import { IToPost, IToPostLike } from './types/instance';
import * as NSRedux from './types/redux';
import { TAGS } from "./constants";


export default {
    async get(filters: NSRedux.IGetAction['filters']): Promise<IGet> {
        return {
            guides: [
                {
                    id: 'kekGuideId',
                    name: 'Guide name',
                    description: 'Some description',
                    city: 'City',
                    authorId: '',
                    likes: 123,
                    budget: '100k',
                    donateLink: 'https://google.com',
                    hasBeenLiked: false,
                    places: [
                        {
                            name: 'Place name',
                            description: 'Some place description',
                            photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgupYQu6kBNUOeH4vWIFBWm5p4z9yHmm9uc3ZipvHbW_aurOi5',
                            lat: '11.0',
                            lng: '11.0',
                        }
                    ],
                    tags: [
                        TAGS.GAAAAY,
                    ],
                }
            ],
        };
    },

    async post(guide: IToPost): Promise<IPost> {
        return {
            guide: {
                id: 'guideId',
                hasBeenLiked: false,
                ...guide,
            }
        }
    },

    async postLike(data: IToPostLike): Promise<IPostLike> {
        return {
            data,
        }
    },
}
