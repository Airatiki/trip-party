import { IPost, IPut, IRemove } from './types/fetchResult';
import { IParticipant, IToPost, IToPut } from './types/instance';


export default {
    async post(participant: IToPost): Promise<IPost> {
        return {
            participant: {
                id: 'kek2345343',
                ...participant,
            }
        };
    },

    async put(participant: IToPut): Promise<IPut> {
        return {
            participant: {
                ...participant,
            }
        };
    },

    async remove(participant: IParticipant): Promise<IRemove> {
        return {
            participant: {
                ...participant,
            }
        }
    }
}
