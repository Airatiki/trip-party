import { IState, IGetSucceedAction, IPutSucceedAction } from './types/redux';
import { IReduxAction } from '../types';

import { ACTIONS_TYPES } from './constants';
import { VISIBILITY } from 'api/travels/constants';


const initState: IState = {
    data: {
        id: '',
        VkId: '',
        friends: [],
        travelsVisibility: VISIBILITY.FRIENDS,
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
