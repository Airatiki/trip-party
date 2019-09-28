import { IPost, IPostNew, IRemove, IRemoveNew } from './types/fetchResult';
import { IParticipant, IToPost, IToPostNew } from './types/instance';


export default {
    async postNew(participant: IToPostNew): Promise<IPostNew> {
        return {
            participant: {
                ...participant,

                id: 'kek2345343',
                firstName: 'Eric',
                lastName: 'Wolf',
                image: 'https://iknowyourmeme.files.wordpress.com/2016/04/14280761127830.jpg?w=616',
            }
        }
    },

    async post(participant: IToPost): Promise<IPost> {
        return {
            participant: {
                ...participant,
            }
        };
    },

    async removeNew(participant: IParticipant): Promise<IRemoveNew> {
        return {
            participant: {
                ...participant,
            }
        }
    },

    async remove(participant: IParticipant): Promise<IRemove> {
        return {
            participant: {
                ...participant,
            }
        }
    }
}
