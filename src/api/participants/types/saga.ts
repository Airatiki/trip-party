import { CallEffect, ForkEffect, PutEffect } from 'redux-saga/effects';
import * as NSRedux from './redux';


export interface IPostNew {
    caller(action: NSRedux.IPostNewAction): IterableIterator<
        CallEffect | PutEffect<NSRedux.IPostNewSucceedAction>
        >;
    taker(): IterableIterator<ForkEffect>;
}

export interface IPost {
    caller(action: NSRedux.IPostAction): IterableIterator<
        CallEffect | PutEffect<NSRedux.IPostSucceedAction>
        >;
    taker(): IterableIterator<ForkEffect>;
}

export interface IRemoveNew {
    caller(action: NSRedux.IRemoveNewAction): IterableIterator<
        CallEffect | PutEffect<NSRedux.IRemoveNewSucceedAction>
        >;
    taker(): IterableIterator<ForkEffect>;
}

export interface IRemove {
    caller(action: NSRedux.IRemoveAction): IterableIterator<
        CallEffect | PutEffect<NSRedux.IPostSucceedAction>
        >;
    taker(): IterableIterator<ForkEffect>;
}
