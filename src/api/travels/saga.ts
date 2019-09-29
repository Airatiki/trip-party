import { call, put, takeLatest } from 'redux-saga/effects';
import { ACTIONS_TYPES } from './constants';

import fetches from './fetches';
import * as NSFetch from './types/fetchResult';
import * as NSRedux from './types/redux';
import { IGet, IPost, IPut } from './types/saga';
import {getAvatars, getDemoParticipantIds, getParticipantsData} from "../../helpers";


export default {
    get(): IGet {
        function* caller(action: NSRedux.IGetAction) {
            const {travels, error}: NSFetch.IGet = yield call(fetches.get, action.filters, action.ownerId);
            const newTravels = [];

            if (travels) {
                for (const travel of travels) {
                    const getIds = getDemoParticipantIds(travel.participants, action.friends, action.ownerId);
                    const result = yield call(getAvatars, getIds);

                    newTravels.push({...travel, demoParticipants: result});
                }
            }

            const success: NSRedux.IGetSucceedAction = {
                type: ACTIONS_TYPES.GET_TRAVELS_SUCCEED,
                error,
                travels: newTravels,
            };

            yield put(success);
        }

        function* taker() {
            yield takeLatest(ACTIONS_TYPES.GET_TRAVELS, caller);
        }

        // @ts-ignore
        return {caller, taker};
    },

    post(): IPost {
        function* caller(action: NSRedux.IPostAction) {
            const {travel, error}: NSFetch.IPost = yield call(fetches.post, action.travel);
            const success: NSRedux.IPostSucceedAction = {
                type: ACTIONS_TYPES.POST_TRAVEL_SUCCEED,
                error,
                travel,
            };
            yield put(success);
        }

        function* taker() {
            yield takeLatest(ACTIONS_TYPES.POST_TRAVEL, caller);
        }

        // @ts-ignore
        return {caller, taker};
    },

    put(): IPut {
        function* caller(action: NSRedux.IPutAction) {
            // @ts-ignore
            const {travel, error}: NSFetch.IPut = yield call(fetches.put, action.travel);
            const success: NSRedux.IPutSucceedAction = {
                type: ACTIONS_TYPES.PUT_TRAVEL_SUCCEED,
                error,
                travel,
            };

            yield put(success);
        }

        function* taker() {
            yield takeLatest(ACTIONS_TYPES.PUT_TRAVEL, caller);
        }

        // @ts-ignore
        return {caller, taker};
    },

    setUserData() {
        interface IData {
            id: string;
            image: string;
            firstName: string;
            lastName: string;
        }

        function* caller(action: NSRedux.ISetUserDataAction) {
            const {travel} = action;
            const participantsIds = travel.participants.map((user) => user.id);
            // @ts-ignore
            const participantsData: IData[] | null = yield call(getParticipantsData, participantsIds);
            const newParticipantsIds = travel.newParticipants.map((user) => user.id);
            // @ts-ignore
            const newParticipantsData: IData[] | null = yield call(getParticipantsData, newParticipantsIds);

            const newTravel = {
                ...travel,
                participants: travel.participants.map((user) => {
                    const data = participantsData ? participantsData.find(
                        (elem) => elem.id === user.id
                    ) : {};
                    return {
                        ...user,
                        ...data,
                    }
                }),
                newParticipants: travel.newParticipants.map((user) => {
                    const data = newParticipantsData ? newParticipantsData.find(
                        (elem) => elem.id === user.id
                    ) : {};
                    return {
                        ...user,
                        ...data,
                    }
                }),
            };

            const success: NSRedux.ISetUserDataSucceedAction = {
                type: ACTIONS_TYPES.SET_USER_DATA_TO_TRAVEL_SUCCEED,
                travel: newTravel,
            };

            yield put(success);
        }

        function* taker() {
            yield takeLatest(ACTIONS_TYPES.SET_USER_DATA_TO_TRAVEL, caller);
        }

        // @ts-ignore
        return {caller, taker};
    },
};
