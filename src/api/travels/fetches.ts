import { VISIBILITY } from './constants';
import { IGet, IPost, IPut } from './types/fetchResult';
import { IToPost, IToPut } from './types/instance';
import * as NSRedux from './types/redux';
import { TAGS } from "../guides/constants";


const guide =                 {
    id: 'kekGuideId',
    name: 'Guide name',
    description: 'Some description description description description description description description description description',
    city: 'City',
    authorId: '',
    likes: 123,
    budget: '100k',
    donateLink: 'https://google.com',
    hasBeenLiked: false,
    places: [
        {
            name: 'Place name',
            description: 'Some place description',
            photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgupYQu6kBNUOeH4vWIFBWm5p4z9yHmm9uc3ZipvHbW_aurOi5',
            lat: '11.0',
            lng: '11.0',
        },
        {
            name: 'Second name',
            description: 'Second place description',
            photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgupYQu6kBNUOeH4vWIFBWm5p4z9yHmm9uc3ZipvHbW_aurOi5',
            lat: '12.0',
            lng: '12.0',
        },
        {
            name: 'Third name',
            description: 'Third place description',
            photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgupYQu6kBNUOeH4vWIFBWm5p4z9yHmm9uc3ZipvHbW_aurOi5',
            lat: '13.0',
            lng: '13.0',
        }
    ],
    tags: [
        TAGS.GAAAAY,
    ],
};

export default {
    async get(filters: NSRedux.IGetAction['filters']): Promise<IGet> {
        return {
            travels: [
                {
                    id: 'id',
                    guide,
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
                guide,
                newParticipants: [],
                participants: [],
            }
        };
    },
}
