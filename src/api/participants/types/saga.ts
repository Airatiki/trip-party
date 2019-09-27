import { CallEffect, ForkEffect, PutEffect } from 'redux-saga/effects';
import * as NSRedux from './redux';


export interface IPost {
    caller(action: NSRedux.IPostToTravelAction | NSRedux.IPostToEventAction): IterableIterator<
        CallEffect | PutEffect<NSRedux.IPostToTravelSucceedAction | NSRedux.IPostToEventSucceedAction>
        >;
    taker(): IterableIterator<ForkEffect>;
}

export interface IPut {
    caller(action: NSRedux.IPutToTravelAction | NSRedux.IPutToEventAction): IterableIterator<
        CallEffect | PutEffect<NSRedux.IPutToTravelSucceedAction | NSRedux.IPutToEventSucceedAction>
        >;
    taker(): IterableIterator<ForkEffect>;
}

export interface IRemove {
    caller(action: NSRedux.IRemoveFromTravelAction | NSRedux.IRemoveFromEventAction): IterableIterator<
        CallEffect | PutEffect<NSRedux.IRemoveFromTravelSucceedAction | NSRedux.IRemoveFromEventSucceedAction>
        >;
    taker(): IterableIterator<ForkEffect>;
}
