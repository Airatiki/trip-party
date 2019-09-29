import { IPost, IPostNew, IRemove, IRemoveNew } from './types/fetchResult';
import { IParticipant, IToPost, IToPostNew } from './types/instance';
import {API_URL} from "../../helpers";


export default {
    async postNew(participant: IToPostNew): Promise<IPostNew> {
        await fetch(`${API_URL}/trip/apply?trip_id=${participant.occasionId}&user_id=${participant.VkId}`);

        return {
            participant: {
                ...participant,
                id: '',
                firstName: '',
                lastName: '',
                image: '',
            }
        }
    },

    async post(participant: IToPost, orgId: string): Promise<IPost> {
        await fetch(`${API_URL}/trip/respond?orgId=${orgId}&response=1&participant_id=${participant.id}`);

        return {
            participant: {
                ...participant,
            }
        };
    },

    async removeNew(participant: IParticipant, orgId: string): Promise<IRemoveNew> {
        await fetch(`${API_URL}/trip/respond?orgId=${orgId}&response=0&participant_id=${participant.id}`);

        return {
            participant: {
                ...participant,
            }
        }
    },

    async remove(participant: IParticipant, orgId: string): Promise<IRemove> {
        await fetch(`${API_URL}/trip/respond?orgId=${orgId}&response=0&participant_id=${participant.id}`);

        return {
            participant: {
                ...participant,
            }
        }
    }
}
