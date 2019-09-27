import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import travels from './travels/reducer';
import events from './events/reducer';


export default combineReducers({
    routing: routerReducer,

    travels,
    events,
});
