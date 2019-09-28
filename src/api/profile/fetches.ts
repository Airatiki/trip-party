import { VISIBILITY } from 'api/travels/constants';
import { IGet, IPut } from './types/fetchResult';
import { IToPut } from './types/instance';
import connect from '@vkontakte/vk-connect';


export default {
    async get(): Promise<IGet> {
        try {
            const userData = await connect.sendPromise('VKWebAppGetUserInfo');
            const users = await connect.sendPromise('VKWebAppGetFriends');


            console.log(userData, users);

            return {
                profile: {
                    id: 'id',
                    VkId: userData.id.toString(),
                    friends: users.users.map((user: any) => user.id),
                    travelsVisibility: VISIBILITY.FRIENDS,
                    travelsAnonymity: false,
                },
            };
        } catch (e) {
            console.log(e);
            return {
                profile: {
                    id: 'id',
                    VkId: '3',
                    friends: [''],
                    travelsVisibility: VISIBILITY.FRIENDS,
                    travelsAnonymity: false,
                },
            };
        }
    },

    async put(profile: IToPut): Promise<IPut> {
        return {
            profile: {
                ...profile,
            }
        };
    },
}
