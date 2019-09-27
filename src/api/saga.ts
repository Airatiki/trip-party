import { all, ForkEffect } from 'redux-saga/effects';

import travels from './travels/saga';
import events from './events/saga';


const sagas: IterableIterator<ForkEffect>[] = [];
const instances = {
    travels,
    events,
};

for (const saga of Object.values(instances)) {
    for (const method of Object.values(saga)) {
        sagas.push(
            method()
                .taker()
        );
    }
}

export default function*() {
    yield all(sagas)
};
