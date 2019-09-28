import { CallEffect, ForkEffect, PutEffect } from 'redux-saga/effects';
import * as NSRedux from './redux';


export interface IGet {
    caller(action: NSRedux.IGetAction): IterableIterator<CallEffect | PutEffect<NSRedux.IGetSucceedAction>>;
    taker(): IterableIterator<ForkEffect>;
}

export interface IPost {
    caller(action: NSRedux.IPostAction): IterableIterator<
        CallEffect | PutEffect<NSRedux.IPostSucceedAction>
        >;
    taker(): IterableIterator<ForkEffect>;
}

export interface IPostLike {
    caller(action: NSRedux.IPostLikeAction): IterableIterator<
        CallEffect | PutEffect<NSRedux.IPostLikeSucceedAction>
        >;
    taker(): IterableIterator<ForkEffect>;
}
