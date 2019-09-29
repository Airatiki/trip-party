import {VISIBILITY} from './constants';
import {IGet, IPost} from './types/fetchResult';
import {IToPost} from './types/instance';
import * as NSRedux from './types/redux';
import {API_URL} from "../../helpers";


// const guide =                 {
//     id: 'kekGuideId',
//     name: 'Guide name',
//     description: 'Some description description description description description',
//     city: 'City',
//     authorId: '',
//     likes: 123,
//     budget: '100k',
//     donateLink: 'https://google.com',
//     hasBeenLiked: false,
//     places: [
//         {
//             name: 'Place name',
//             description: 'Some place description',
//             photo: 'https://encrypted-tbn0.gstat',
//             lat: '11.0',
//             lng: '11.0',
//         },
//         {
//             name: 'Second name',
//             description: 'Second place description',
//             photo: 'https://encrypted-tbn0.gstatic.',
//             lat: '12.0',
//             lng: '12.0',
//         },
//         {
//             name: 'Third name',
//             description: 'Third place description',
//             photo: 'https://encrypted-tbn05',
//             lat: '13.0',
//             lng: '13.0',
//         }
//     ],
//     tags: [
//         TAGS.GAAAAY,
//     ],
// };

export default {
    async get(filters: NSRedux.IGetAction['filters'], userId: string): Promise<IGet> {
        let request = await fetch(`${API_URL}/trip/get`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                mine: filters.mine,
                user_id: Number(userId),
                trip_id: Number(filters.id),
                city: filters.city,
                budget: filters.budget,
                visibility: filters.friends ? 0 : 1,
                start_date: filters.startDate,
                finish_date: filters.endDate,
                hashtags: filters.tags ? filters.tags.map((tag) => ({name: tag})) : []
            })
        });

        request = await request.json();

        const result = (request as any).result;

        console.log('SUCHKA', result);

        const travels = result.map((travel: any) => {
            const newParticipants = [];
            const participants = [];

            for (const person of travel.participants) {
                const participant = {
                    id: person.id,
                    VkId: person.VkId,
                    occasionId: travel.trip_id,
                    firstName: '',
                    lastName: '',
                    image: '',
                };

                if (person.accept_status === 'ACCEPTED') {
                    participants.push(participant);
                } else {
                    newParticipants.push(person);
                }
            }

            return {
                id: travel.id,
                guide:  travel.guide,
                authorId: travel.creator_id,
                name: travel.name,
                description: travel.description,
                visibility: travel.visibility === VISIBILITY.ALL ? VISIBILITY.ALL : VISIBILITY.FRIENDS,
                startDate: travel.startDate,
                endDate: travel.finishDate,
                showTicketCost: true,
                noNewPeople: false,
                chatLink: travel.chat,
                newParticipants,
                participants,
                demoParticipants: []
            }

        });

        return {travels};

        // return {
        //     travels: [
        //         {
        //             id: 'id',
        //             guide,
        //             authorId: '',
        //             name: 'Name',
        //             description: 'Description  Description Description Description ',
        //             visibility: VISIBILITY.ALL,
        //             startDate: new Date(),
        //             endDate: new Date(),
        //             showTicketCost: true,
        //             noNewPeople: false,
        //             chatLink: 'https://vk.me/join/AJQ1d/4s3RQ7bSdaUG7paZuD',
        //             newParticipants: [
        //                 {
        //                     id: 'kekIdqqqqqqqq',
        //                     VkId: '123123',
        //                     occasionId: 'id',
        //                     firstName: 'Pop',
        //                     lastName: 'Popo',
        //                     image: 'https://iknowyourmeme.files.wordpress.com/2016/04/14280761127830.jpg?w=616',
        //                 },
        //                 {
        //                     id: 'kekIdqrgasdf',
        //                     VkId: '12354835654',
        //                     occasionId: 'id',
        //                     firstName: 'Pep',
        //                     lastName: 'Pepe',
        //                     image: 'https://iknowyourmeme.files.wordpress.com/2016/04/14280761127830.jpg?w=616',
        //                 },
        //             ],
        //             demoParticipants: [],
        //             participants: [
        //                 {
        //                     id: 'kekIdutenhfbdg',
        //                     VkId: '123',
        //                     occasionId: 'id',
        //                     firstName: 'Eric',
        //                     lastName: 'Wolf',
        //                     image: 'https://iknowyourmeme.files.wordpress.com/2016/04/14280761127830.jpg?w=616',
        //                 },
        //                 {
        //                     id: 'kekId1euynhrdbgf',
        //                     VkId: '1231',
        //                     occasionId: 'id',
        //                     firstName: 'Kek',
        //                     lastName: 'Keken',
        //                     image: 'https://iknowyourmeme.files.wordpress.com/2016/04/14280761127830.jpg?w=616',
        //                 }
        //             ],
        //         }
        //     ],
        // };
    },

    async post(travel: IToPost): Promise<IPost> {
        let request = await fetch(`${API_URL}/trip/create`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                orgId: travel.authorId,
                visibility: travel.visibility === VISIBILITY.FRIENDS ? 0 : 1,
                startDate: travel.startDate,
                finishDate: travel.endDate,
                chat: travel.chatLink,
                guide: travel.guide
            })
        });

        request = await request.json();

        const result = (request as any).result;

        const newParticipants = [];
        const participants = [];

        for (const person of result.participants) {
            const participant = {
                id: person.id,
                VkId: person.VkId,
                occasionId: result.trip_id,
                firstName: '',
                lastName: '',
                image: '',
            };

            if (person.accept_status === 'ACCEPTED') {
                participants.push(participant);
            } else {
                newParticipants.push(person);
            }
        }


        return {
            travel: {
                id: result.trip_id,
                ...travel,
                participants,
                showTicketCost: true,
                newParticipants,
                noNewPeople: false,
            }
        };
    },

    async put(travel: IToPost): Promise<IPost> {
        let request = await fetch(`${API_URL}/trip/update`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                orgId: travel.authorId,
                visibility: travel.visibility === VISIBILITY.FRIENDS ? 0 : 1,
                startDate: travel.startDate,
                finishDate: travel.endDate,
                chat: travel.chatLink,
                guide: travel.guide
            })
        });

        request = await request.json();

        const result = (request as any).result;

        const newParticipants = [];
        const participants = [];

        for (const person of result.participants) {
            const participant = {
                id: person.id,
                VkId: person.VkId,
                occasionId: result.trip_id,
                firstName: '',
                lastName: '',
                image: '',
            };

            if (person.accept_status === 'ACCEPTED') {
                participants.push(participant);
            } else {
                newParticipants.push(person);
            }
        }


        return {
            travel: {
                id: result.trip_id,
                ...travel,
                participants,
                showTicketCost: true,
                newParticipants,
                noNewPeople: false,
            }
        };

        // return {
        //     travel: {
        //         ...travel,
        //         authorId: 'id',
        //         guide,
        //         newParticipants: [],
        //         participants: [],
        //     }
        // };
    },
}
