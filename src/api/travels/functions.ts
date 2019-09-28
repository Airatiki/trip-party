import { ITravel } from './types/instance';
import { IParticipant } from '../participants/types/instance';


export function postNewParticipant(data: ITravel[], participant: IParticipant): ITravel[] {
    const travel = data.find((travel) => travel.id === participant.occasionId);
    const ind = data.indexOf(travel!);

    if (!travel) {
        return data;
    }

    data[ind] = {
        ...travel,
        newParticipants: [
            participant,
            ...travel.participants,
        ],
    };

    return [...data];
}

export function postParticipant(data: ITravel[], participant: IParticipant): ITravel[] {
    const travel = data.find((travel) => travel.id === participant.occasionId);
    const ind = data.indexOf(travel!);

    if (!travel) {
        return data;
    }

    data[ind] = {
        ...travel,
        newParticipants: [
            ...travel.newParticipants.filter((user) => user.VkId !== participant.VkId),
        ],
        participants: [
            participant,
            ...travel.participants,
        ],
    };
    return [...data];
}

export function removeNewParticipant(data: ITravel[], participant: IParticipant): ITravel[] {
    const travel = data.find((travel) => travel.id === participant.occasionId);
    const ind = data.indexOf(travel!);

    if (!travel) {
        return data;
    }

    data[ind] = {
        ...travel,
        newParticipants: travel.newParticipants.filter((user) => user.VkId !== participant.VkId)
    };

    return [...data];
}


export function removeParticipant(data: ITravel[], participant: IParticipant): ITravel[] {
    const travel = data.find((travel) => travel.id === participant.occasionId);
    const ind = data.indexOf(travel!);

    if (!travel) {
        return data;
    }

    data[ind] = {
        ...travel,
        participants: travel.participants.filter((user) => user.VkId !== participant.VkId)
    };

    return [...data];
}
