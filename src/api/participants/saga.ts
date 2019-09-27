import { call, put, takeLatest } from 'redux-saga/effects';
import { ACTIONS_TYPES } from './constants';

import fetches from './fetches';
import * as NSFetch from './types/fetchResult';
import * as NSRedux from './types/redux';
import { IPost, IPut, IRemove } from './types/saga';


export default {
    post(): IPost {
        function* caller(action: NSRedux.IPostToTravelAction | NSRedux.IPostToEventAction) {
            const {participant, error}: NSFetch.IPost = yield call(fetches.post, action.participant);

            switch (action.type) {
                case ACTIONS_TYPES.POST_PARTICIPANT_TO_TRAVEL: {
                    const success: NSRedux.IPostToTravelSucceedAction = {
                        type: ACTIONS_TYPES.POST_PARTICIPANT_TO_TRAVEL_SUCCEED,
                        error,
                        participant,
                    };

                    yield put(success);
                    break;
                }
                case ACTIONS_TYPES.POST_PARTICIPANT_TO_EVENT: {
                    const success: NSRedux.IPostToEventSucceedAction = {
                        type: ACTIONS_TYPES.POST_PARTICIPANT_TO_EVENT_SUCCEED,
                        error,
                        participant,
                    };

                    yield put(success);
                    break;
                }
            }
        }

        function* taker() {
            yield takeLatest(ACTIONS_TYPES.POST_PARTICIPANT_TO_TRAVEL, caller);
            yield takeLatest(ACTIONS_TYPES.POST_PARTICIPANT_TO_EVENT, caller);
        }

        // @ts-ignore
        return {caller, taker};
    },

    put(): IPut {
        function* caller(action: NSRedux.IPutToTravelAction | NSRedux.IPutToEventAction) {
            const {participant, error}: NSFetch.IPut = yield call(fetches.put, action.participant);

            switch (action.type) {
                case ACTIONS_TYPES.PUT_PARTICIPANT_TO_TRAVEL: {
                    const success: NSRedux.IPutToTravelSucceedAction = {
                        type: ACTIONS_TYPES.PUT_PARTICIPANT_TO_TRAVEL_SUCCEED,
                        error,
                        participant,
                    };

                    yield put(success);
                    break;
                }
                case ACTIONS_TYPES.PUT_PARTICIPANT_TO_EVENT: {
                    const success: NSRedux.IPutToEventSucceedAction = {
                        type: ACTIONS_TYPES.PUT_PARTICIPANT_TO_EVENT_SUCCEED,
                        error,
                        participant,
                    };

                    yield put(success);
                    break;
                }
            }
        }

        function* taker() {
            yield takeLatest(ACTIONS_TYPES.PUT_PARTICIPANT_TO_TRAVEL, caller);
            yield takeLatest(ACTIONS_TYPES.PUT_PARTICIPANT_TO_EVENT, caller);
        }

        // @ts-ignore
        return {caller, taker};
    },

    remove(): IRemove {
        function* caller(action: NSRedux.IRemoveFromTravelAction | NSRedux.IRemoveFromEventAction) {
            const {participant, error}: NSFetch.IRemove = yield call(fetches.remove, action.participant);

            switch (action.type) {
                case ACTIONS_TYPES.REMOVE_PARTICIPANT_FROM_TRAVEL: {
                    const success: NSRedux.IRemoveFromTravelSucceedAction = {
                        type: ACTIONS_TYPES.REMOVE_PARTICIPANT_FROM_TRAVEL_SUCCEED,
                        error,
                        participant,
                    };

                    yield put(success);
                    break;
                }
                case ACTIONS_TYPES.REMOVE_PARTICIPANT_FROM_EVENT: {
                    const success: NSRedux.IRemoveFromEventSucceedAction = {
                        type: ACTIONS_TYPES.REMOVE_PARTICIPANT_FROM_EVENT_SUCCEED,
                        error,
                        participant,
                    };

                    yield put(success);
                    break;
                }
            }
        }

        function* taker() {
            yield takeLatest(ACTIONS_TYPES.REMOVE_PARTICIPANT_FROM_TRAVEL, caller);
            yield takeLatest(ACTIONS_TYPES.REMOVE_PARTICIPANT_FROM_EVENT, caller);
        }

        // @ts-ignore
        return {caller, taker};
    },
};
