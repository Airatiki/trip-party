import { IParticipant } from 'api/participants/types/instance';


export interface IProps {
    isForm: boolean;
    occasionAuthorId: string;
    participant: IParticipant;
}
