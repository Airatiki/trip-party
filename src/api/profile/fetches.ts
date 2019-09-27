import { IGet, IPut } from './types/fetchResult';
import { IToPut } from './types/instance';


export default {
    async get(): Promise<IGet> {
        return {
            profile: {
                id: 'id',
                VkId: 12345,
                eventsAnonymity: false,
                travelsAnonymity: false,
            },
        };
    },

    async put(profile: IToPut): Promise<IPut> {
        return {
            profile: {
                ...profile,
            }
        };
    },
}
