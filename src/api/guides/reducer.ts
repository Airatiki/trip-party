import { IReduxAction } from '../types';
import { ACTIONS_TYPES } from './constants';
import { IState, IGetSucceedAction, IPostSucceedAction } from './types/redux';


const initState: IState = {
    data: [],
    isLoaded: false,
    error: null,
};

export default function(state: IState = initState, action: IReduxAction) {
    switch (action.type) {
        case ACTIONS_TYPES.GET_GUIDES_SUCCEED: {
            const {guides, error} = <IGetSucceedAction>action;
            return error ?
                {
                    ...state,
                    error,
                    isLoaded: true,
                } :
                {
                    ...state,
                    data: guides,
                    error: null,
                    isLoaded: true,
                }
        }
        case ACTIONS_TYPES.POST_GUIDE_SUCCEED: {
            const {guide, error} = <IPostSucceedAction>action;
            return error ?
                {
                    ...state,
                    error,
                    isLoaded: true,
                } :
                {
                    ...state,
                    data: [guide, ...state.data],
                    error: null,
                    isLoaded: true,
                }
        }
        default:
            return state;
    }
}
