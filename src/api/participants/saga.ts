import { call, put, takeLatest } from 'redux-saga/effects';
import { ACTIONS_TYPES } from './constants';

import fetches from './fetches';
import * as NSFetch from './types/fetchResult';
import * as NSRedux from './types/redux';
import { IPost, IPostNew, IRemove, IRemoveNew } from './types/saga';


export default {
    postNew(): IPostNew {
        function* caller(action: NSRedux.IPostNewAction) {
            const {participant, error}: NSFetch.IPost = yield call(fetches.postNew, action.participant);
            const success: NSRedux.IPostNewSucceedAction = {
                type: ACTIONS_TYPES.POST_NEW_PARTICIPANT_SUCCEED,
                error,
                participant,
            };

            yield put(success);
        }

        function* taker() {
            yield takeLatest(ACTIONS_TYPES.POST_NEW_PARTICIPANT, caller);
        }

        // @ts-ignore
        return {caller, taker};
    },

    post(): IPost {
        function* caller(action: NSRedux.IPostAction) {
            const {participant, error}: NSFetch.IPost = yield call(fetches.post, action.participant, action.orgId);
            const success: NSRedux.IPostSucceedAction = {
                type: ACTIONS_TYPES.POST_PARTICIPANT_SUCCEED,
                error,
                participant,
            };

            yield put(success);
        }

        function* taker() {
            yield takeLatest(ACTIONS_TYPES.POST_PARTICIPANT, caller);
        }

        // @ts-ignore
        return {caller, taker};
    },

    removeNew(): IRemoveNew {
        function* caller(action: NSRedux.IRemoveNewAction) {
            const {participant, error}: NSFetch.IRemoveNew = yield call(
                fetches.removeNew,
                action.participant,
                action.orgId
            );
            const success: NSRedux.IRemoveNewSucceedAction = {
                type: ACTIONS_TYPES.REMOVE_NEW_PARTICIPANT_SUCCEED,
                error,
                participant,
            };

            yield put(success);
        }

        function* taker() {
            yield takeLatest(ACTIONS_TYPES.REMOVE_NEW_PARTICIPANT, caller);
        }

        // @ts-ignore
        return {caller, taker};
    },

    remove(): IRemove {
        function* caller(action: NSRedux.IRemoveAction) {
            const {participant, error}: NSFetch.IRemove = yield call(fetches.remove, action.participant, action.orgId);
            const success: NSRedux.IRemoveSucceedAction = {
                type: ACTIONS_TYPES.REMOVE_PARTICIPANT_SUCCEED,
                error,
                participant,
            };

            yield put(success);
        }

        function* taker() {
            yield takeLatest(ACTIONS_TYPES.REMOVE_PARTICIPANT, caller);
        }

        // @ts-ignore
        return {caller, taker};
    },
};
