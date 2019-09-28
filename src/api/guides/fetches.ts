import { IGet, IPost } from './types/fetchResult';
import { IToPost } from './types/instance';
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
                    places: [],
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
                ...guide,
            }
        }
    },
}
