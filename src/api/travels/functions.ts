import { ITravel } from './types/instance';
import { IParticipant } from '../participants/types/instance';


export function postParticipant(data: ITravel[], participant: IParticipant): ITravel[] {
    const travel = data.find((travel) => travel.id === participant.occasionId);

    if (!travel) {
        return data;
    }

    travel.participants.push(participant);
    return [...data];
}

export function putParticipant(data: ITravel[], participant: IParticipant): ITravel[] {
    const travel = data.find((travel) => travel.id === participant.occasionId);

    if (!travel) {
        return data;
    }

    travel.participants = [
        participant,
        ...travel.participants.filter((user) => user.id !== participant.id),
    ];
    return [...data];
}

export function removeParticipant(data: ITravel[], participant: IParticipant): ITravel[] {
    const travel = data.find((travel) => travel.id === participant.occasionId);

    if (!travel) {
        return data;
    }

    travel.participants = travel.participants.filter((user) => user.id !== participant.id);
    return [...data];
}
