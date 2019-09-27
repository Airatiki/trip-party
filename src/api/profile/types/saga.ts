import { CallEffect, ForkEffect, PutEffect } from 'redux-saga/effects';
import * as NSRedux from './redux';


export interface IGet {
    caller(action: NSRedux.IGetAction): IterableIterator<CallEffect | PutEffect<NSRedux.IGetSucceedAction>>;
    taker(): IterableIterator<ForkEffect>;
}

export interface IPut {
    caller(action: NSRedux.IPutAction): IterableIterator<
        CallEffect | PutEffect<NSRedux.IPutSucceedAction>
        >;
    taker(): IterableIterator<ForkEffect>;
}
