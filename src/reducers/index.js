import { combineReducers } from 'redux';

import counterReducer from './counterReducer';
import routeReducer from './routeReducer';

export default combineReducers({ counterReducer, routeReducer });
