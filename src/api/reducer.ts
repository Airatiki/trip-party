import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import travels from './travels/reducer';
import profile from './profile/reducer';
import guides from './guides/reducer';


export default combineReducers({
    routing: routerReducer,

    travels,
    profile,
    guides,
});
