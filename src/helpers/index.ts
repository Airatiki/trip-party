import {IParticipant} from "../api/participants/types/instance";
import connect from '@vkontakte/vk-connect';

export const API_URL = 'https://50bb7342.ngrok.io/trip-and-party-1.0';

export function dateToHtml(date: Date): string {
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDate();

    return `${year}-${month < 10 ? 0 : ''}${month}-${day < 10 ? 0 : ''}${day}`;
}

export function timeToHtml(date: Date): string {
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${hours < 10 ? 0 : ''}${hours}:${minutes < 10 ? 0 : ''}${minutes}`;
}

export function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDate();

    return `${day < 10 ? 0 : ''}${day}.${month < 10 ? 0 : ''}${month}.${year}`;
}

export function formatTime(date: Date): string {
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${hours < 10 ? 0 : ''}${hours}:${minutes < 10 ? 0 : ''}${minutes}`;
}

export function getDemoParticipantIds(participants: IParticipant[], friends: string[], ownerId: string): string[] {
    const demoParticipantIds = [];
    const participantsIds = participants.map((p) => p.VkId);
    const isOwnerParticipate = participantsIds.find((p) => p === ownerId);

    if (!!isOwnerParticipate) {
        demoParticipantIds.push(ownerId);
    }

    participantsIds.filter((value) => friends.includes(value)).forEach((id) => {
        demoParticipantIds.push(id);
    });

    participantsIds.forEach((id) => {
        demoParticipantIds.push(id);
    });

    return demoParticipantIds.slice(0, 3);
}

export async function getAvatars(ids: string[]) {
    try {
        const data = await connect.sendPromise("VKWebAppGetAuthToken",
            {app_id: 7143877, scope: "friends,status"});

        // TODO: Load users instead of friends
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

        return (items.response as any).items.slice(0, 3).map((friend: any) => friend.photo_100);
    } catch (e) {
        console.log(e);

        return null;
    }
}

interface IData {
    id: string;
    image: string;
    firstName: string;
    lastName: string;
}

export async function getParticipantsData(ids: string): Promise<IData[] | null> {
    try {
        const data = await connect.sendPromise("VKWebAppGetAuthToken",
            {app_id: 7143877, scope: "friends,status"});

        // TODO: Load users instead of friends
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

        return (items.response as any).map((friend: any) => ({
                id: `${friend.id}`,
                image: friend.photo_100,
                firstName: friend.first_name,
                lastName: friend.last_name
            })
        );
    } catch (e) {
        console.log(e);

        return null;
    }

}
