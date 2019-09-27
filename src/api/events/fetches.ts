import { VISIBILITY } from './constants';
import { IGet, IPost, IPut } from './types/fetchResult';
import { IToPost, IToPut } from './types/instance';
import * as NSRedux from './types/redux';


export default {
    async get(filters: NSRedux.IGetAction['filters']): Promise<IGet> {
        return {
            events: [
                {
                    id: 'id123',
                    name: 'Name',
                    description: 'Description',
                    visibility: VISIBILITY.ALL,
                    startDate: new Date(),
                    time: '123',
                    place: 'Moya djopa',
                    chat: 'some url',
                    participants: [],
                }
            ],
        };
    },

    async post(event: IToPost): Promise<IPost> {
        return {
            event: {
                id: 'kek2345343',
                ...event,
                chat: 'url',
                participants: [],
            }
        };
    },

    async put(event: IToPut): Promise<IPut> {
        return {
            event: {
                ...event,
                participants: [],
            }
        };
    },
}
