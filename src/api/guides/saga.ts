import { call, put, takeLatest } from 'redux-saga/effects';
import { ACTIONS_TYPES } from './constants';

import fetches from './fetches';
import * as NSFetch from './types/fetchResult';
import * as NSRedux from './types/redux';
import { IGet, IPost } from './types/saga';


export default {
    get(): IGet {
        function* caller(action: NSRedux.IGetAction) {
            const {guides, error}: NSFetch.IGet = yield call(fetches.get, action.filters);
            const success: NSRedux.IGetSucceedAction = {
                type: ACTIONS_TYPES.GET_GUIDES_SUCCEED,
                error,
                guides,
            };

            yield put(success);
        }

        function* taker() {
            yield takeLatest(ACTIONS_TYPES.GET_GUIDES, caller);
        }

        // @ts-ignore
        return {caller, taker};
    },

    post(): IPost {
        function* caller(action: NSRedux.IPostAction) {
            const {guide, error}: NSFetch.IPost = yield call(fetches.post, action.guide);
            const success: NSRedux.IPostSucceedAction = {
                type: ACTIONS_TYPES.POST_GUIDE_SUCCEED,
                error,
                guide,
            };

            yield put(success);
        }

        function* taker() {
            yield takeLatest(ACTIONS_TYPES.POST_GUIDE, caller);
        }

        // @ts-ignore
        return {caller, taker};
    },
}
