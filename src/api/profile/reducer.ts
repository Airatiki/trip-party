import { IReduxAction } from '../types';
import { ACTIONS_TYPES } from './constants';
import { IState, IGetSucceedAction, IPutSucceedAction } from './types/redux';


const initState: IState = {
    data: {
        id: '',
        VkId: -1,
        eventsAnonymity: false,
        travelsAnonymity: false,
    },
    isLoaded: false,
    error: null,
};

export default function(state: IState = initState, action: IReduxAction) {
    switch (action.type) {
        case ACTIONS_TYPES.GET_PROFILE_SUCCEED: {
            const {profile, error} = <IGetSucceedAction>action;

            return error ?
                {
                    ...state,
                    error,
                    isLoaded: true,
                } :
                {
                    ...state,
                    data: profile,
                    error: null,
                    isLoaded: true,
                }
        }

        case ACTIONS_TYPES.PUT_PROFILE_SUCCEED: {
            const {profile, error} = <IPutSucceedAction>action;

            return error ?
                {
                    ...state,
                    error,
                    isLoaded: true,
                } :
                {
                    ...state,
                    data: {...state.data, ...profile},
                    error: null,
                    isLoaded: true,
                }
        }

        default: {
            return state;
        }
    }
}
