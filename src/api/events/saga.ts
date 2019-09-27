import { call, put, takeLatest } from 'redux-saga/effects';
import { ACTIONS_TYPES } from './constants';

import fetches from './fetches';
import * as NSFetch from './types/fetchResult';
import * as NSRedux from './types/redux';
import { IGet, IPost, IPut } from './types/saga';


export default {
    get(): IGet {
        function* caller(action: NSRedux.IGetAction) {
            const {events, error}: NSFetch.IGet = yield call(fetches.get, action.filters);
            const success: NSRedux.IGetSucceedAction = {
                type: ACTIONS_TYPES.GET_EVENTS_SUCCEED,
                error,
                events,
            };

            yield put(success);
        }

        function* taker() {
            yield takeLatest(ACTIONS_TYPES.GET_EVENTS, caller);
        }

        // @ts-ignore
        return {caller, taker};
    },

    post(): IPost {
        function* caller(action: NSRedux.IPostAction) {
            const {event, error}: NSFetch.IPost = yield call(fetches.post, action.event);
            const success: NSRedux.IPostSucceedAction = {
                type: ACTIONS_TYPES.POST_EVENT_SUCCEED,
                error,
                event,
            };

            yield put(success);
        }

        function* taker() {
            yield takeLatest(ACTIONS_TYPES.POST_EVENT, caller);
        }

        // @ts-ignore
        return {caller, taker};
    },

    put(): IPut {
        function* caller(action: NSRedux.IPutAction) {
            const {event, error}: NSFetch.IPut = yield call(fetches.put, action.event);
            const success: NSRedux.IPutSucceedAction = {
                type: ACTIONS_TYPES.PUT_EVENT_SUCCEED,
                error,
                event,
            };

            yield put(success);
        }

        function* taker() {
            yield takeLatest(ACTIONS_TYPES.PUT_EVENT, caller);
        }

        // @ts-ignore
        return {caller, taker};
    },
};
