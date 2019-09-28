import { VISIBILITY } from './constants';
import { IGet, IPost, IPut } from './types/fetchResult';
import { IToPost, IToPut } from './types/instance';
import * as NSRedux from './types/redux';


export default {
    async get(filters: NSRedux.IGetAction['filters']): Promise<IGet> {
        return {
            travels: [
                {
                    id: 'id',
                    guideId: 'kekGuideId',
                    authorId: '',
                    name: 'Name',
                    description: 'Description Description Description Description Description Description Description ',
                    visibility: VISIBILITY.ALL,
                    startDate: new Date(),
                    endDate: new Date(),
                    showTicketCost: true,
                    noNewPeople: false,
                    chatLink: 'https://vk.me/join/AJQ1d/4s3RQ7bSdaUG7paZuD',
                    newParticipants: [
                        {
                            id: 'kekIdqqqqqqqq',
                            VkId: '123123',
                            occasionId: 'id',
                            firstName: 'Pop',
                            lastName: 'Popo',
                            image: 'https://iknowyourmeme.files.wordpress.com/2016/04/14280761127830.jpg?w=616',
                        },
                        {
                            id: 'kekIdqrgasdf',
                            VkId: '12354835654',
                            occasionId: 'id',
                            firstName: 'Pep',
                            lastName: 'Pepe',
                            image: 'https://iknowyourmeme.files.wordpress.com/2016/04/14280761127830.jpg?w=616',
                        },
                    ],
                    demoParticipants: [],
                    participants: [
                        {
                            id: 'kekIdutenhfbdg',
                            VkId: '123',
                            occasionId: 'id',
                            firstName: 'Eric',
                            lastName: 'Wolf',
                            image: 'https://iknowyourmeme.files.wordpress.com/2016/04/14280761127830.jpg?w=616',
                        },
                        {
                            id: 'kekId1euynhrdbgf',
                            VkId: '1231',
                            occasionId: 'id',
                            firstName: 'Kek',
                            lastName: 'Keken',
                            image: 'https://iknowyourmeme.files.wordpress.com/2016/04/14280761127830.jpg?w=616',
                        }
                    ],
                }
            ],
        };
    },

    async post(travel: IToPost): Promise<IPost> {
        return {
            travel: {
                id: 'kek',
                authorId: 'id',
                ...travel,
                participants: [],
                showTicketCost: true,
                newParticipants: [],
                noNewPeople: false,
            }
        };
    },

    async put(travel: IToPut): Promise<IPut> {
        return {
            travel: {
                ...travel,
                authorId: 'id',
                guideId: 'kekGuideId',
                newParticipants: [],
                participants: [],
            }
        };
    },
}
