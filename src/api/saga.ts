import { all, ForkEffect } from 'redux-saga/effects';

import travels from './travels/saga';
import participants from './participants/saga';
import profile from './profile/saga';
import guides from './guides/saga';


const sagas: IterableIterator<ForkEffect>[] = [];
const instances = {
    travels,
    participants,
    profile,
    guides,
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
