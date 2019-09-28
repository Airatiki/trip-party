export interface IParticipant {
    id: string;
    VkId: string;
    occasionId: string;
    image: string;
    firstName: string;
    lastName: string;
}

export interface IToPostNew {
    VkId: string;
    occasionId: string;
}

export interface IToPost {
    id: string;
    VkId: string;
    occasionId: string;
    image: string;
    firstName: string;
    lastName: string;
}
