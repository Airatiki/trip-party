import { VISIBILITY } from './constants';
import { IGet, IPost, IPut } from './types/fetchResult';
import { IToPost, IToPut } from './types/instance';
import * as NSRedux from './types/redux';


export default {
    async get(filters: NSRedux.IGetAction['filters']): Promise<IGet> {
        return {
            travels: [
                {
                    id: 'id0',
                    name: 'Name',
                    description: 'Description',
                    visibility: VISIBILITY.ALL,
                    startDate: new Date(),
                    endDate: new Date(),
                    place: 'Moya djopa',
                    ticket: 'Some ticket',
                    chat: 'some url',
                    participants: [],
                }
            ],
        };
    },

    async post(travel: IToPost): Promise<IPost> {
        return {
            travel: {
                id: 'kek',
                ...travel,
                chat: 'url',
                participants: [],
            }
        };
    },

    async put(travel: IToPut): Promise<IPut> {
        return {
            travel: {
                ...travel,
                participants: [],
            }
        };
    },
}
