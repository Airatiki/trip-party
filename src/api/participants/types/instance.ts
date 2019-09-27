export interface IParticipant {
    id: string;
    VkId: number;
    occasionId: string;
    role: string;
}

export interface IToPost {
    VkId: number;
    occasionId: string;
    role: string;
}

export interface IToPut {
    id: string;
    VkId: number;
    occasionId: string;
    role: string;
}
