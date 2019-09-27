import { call, put, takeLatest } from 'redux-saga/effects';
import { ACTIONS_TYPES } from './constants';

import fetches from './fetches';
import * as NSFetch from './types/fetchResult';
import * as NSRedux from './types/redux';
import { IGet, IPut } from './types/saga';


export default {
    get(): IGet {
        function* caller(action: NSRedux.IGetAction) {
            const {profile, error}: NSFetch.IGet = yield call(fetches.get);
            const success: NSRedux.IGetSucceedAction = {
                type: ACTIONS_TYPES.GET_PROFILE_SUCCEED,
                error,
                profile,
            };

            yield put(success);
        }

        function* taker() {
            yield takeLatest(ACTIONS_TYPES.GET_PROFILE, caller);
        }

        // @ts-ignore
        return {caller, taker};
    },

    put(): IPut {
        function* caller(action: NSRedux.IPutAction) {
            const {profile, error}: NSFetch.IPut = yield call(fetches.put, action.profile);
            const success: NSRedux.IPutSucceedAction = {
                type: ACTIONS_TYPES.PUT_PROFILE_SUCCEED,
                error,
                profile,
            };

            yield put(success);
        }

        function* taker() {
            yield takeLatest(ACTIONS_TYPES.PUT_PROFILE, caller);
        }

        // @ts-ignore
        return {caller, taker};
    },
};
