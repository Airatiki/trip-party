import { ACTIONS_TYPES as PARTICIPANTS_ACTIONS_TYPES } from '../participants/constants';
import * as NSParticipantsRedux from '../participants/types/redux';
import { IReduxAction } from '../types';
import { ACTIONS_TYPES } from './constants';
import { IState, IGetSucceedAction, IPostSucceedAction, IPutSucceedAction } from './types/redux';
import { postParticipant, putParticipant, removeParticipant } from './functions';


const initState: IState = {
    data: [],
    isLoaded: false,
    error: null,
};

export default function(state: IState = initState, action: IReduxAction) {
    switch (action.type) {
        case ACTIONS_TYPES.GET_EVENTS_SUCCEED: {
            const {events, error} = <IGetSucceedAction>action;

            return error ?
                {
                    ...state,
                    error,
                    isLoaded: true,
                } :
                {
                    ...state,
                    data: events,
                    error: null,
                    isLoaded: true,
                }
        }

        case ACTIONS_TYPES.POST_EVENT_SUCCEED: {
            const {event, error} = <IPostSucceedAction>action;

            return error ?
                {
                    ...state,
                    error,
                    isLoaded: true,
                } :
                {
                    ...state,
                    data: [event, ...state.data],
                    error: null,
                    isLoaded: true,
                }
        }

        case ACTIONS_TYPES.PUT_EVENT_SUCCEED: {
            const {event, error} = <IPutSucceedAction>action;

            return error ?
                {
                    ...state,
                    error,
                    isLoaded: true,
                } :
                {
                    ...state,
                    data: [event, ...state.data.filter((elem) => elem.id !== event!.id)],
                    error: null,
                    isLoaded: true,
                }
        }

        case PARTICIPANTS_ACTIONS_TYPES.POST_PARTICIPANT_TO_TRAVEL_SUCCEED: {
            const {participant, error} = <NSParticipantsRedux.IPostToTravelSucceedAction>action;

            return error ?
                {
                    ...state,
                    error,
                    isLoaded: true,
                } :
                {
                    ...state,
                    data: postParticipant(state.data, participant!),
                    error: null,
                    isLoaded: true,
                }
        }

        case PARTICIPANTS_ACTIONS_TYPES.PUT_PARTICIPANT_TO_TRAVEL_SUCCEED: {
            const {participant, error} = <NSParticipantsRedux.IPutToTravelSucceedAction>action;

            return error ?
                {
                    ...state,
                    error,
                    isLoaded: true,
                } :
                {
                    ...state,
                    data: putParticipant(state.data, participant!),
                    error: null,
                    isLoaded: true,
                }
        }

        case PARTICIPANTS_ACTIONS_TYPES.REMOVE_PARTICIPANT_FROM_TRAVEL_SUCCEED: {
            const {participant, error} = <NSParticipantsRedux.IRemoveFromTravelSucceedAction>action;

            return error ?
                {
                    ...state,
                    error,
                    isLoaded: true,
                } :
                {
                    ...state,
                    data: removeParticipant(state.data, participant!),
                    error: null,
                    isLoaded: true,
                }
        }

        default: {
            return state;
        }
    }
}
