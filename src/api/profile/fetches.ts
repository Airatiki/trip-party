import { VISIBILITY } from 'api/travels/constants';
import { IGet, IPut } from './types/fetchResult';
import { IToPut } from './types/instance';
import connect from '@vkontakte/vk-connect';
import {APP_ID} from "../../helpers";


export default {
    async get(): Promise<IGet> {
        try {
            const userData = await connect.sendPromise('VKWebAppGetUserInfo');
            const data = await connect.sendPromise("VKWebAppGetAuthToken",
                {app_id: APP_ID, scope: "friends,status"});
            const items = await connect.sendPromise('VKWebAppCallAPIMethod', {
                method: 'friends.get',
                params: {
                    count: 50,
                    fields: 'city,domain,photo_100',
                    order: 'random',
                    v: '5.101',
                    access_token: data.access_token
                },
            });

            return {
                profile: {
                    id: 'id',
                    VkId: userData.id.toString(),
                    friends: (items.response as any).items.map((user: any) => user.id),
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
