/**
  * Application reducers to update application store in repsonse to actions
  *
  * @ignore
  */
// vendor
import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import find from 'lodash/find';
// utils
import getLabel from 'utils/get-label';
// containers
import { NAVITEMS } from 'containers/App/constants';
// App constants
import {
  LOCATION_UPDATE,
  NAVIGATION_OCCURED,
  DATA,
  DATA_REQUESTED,
  DATA_LOADED,
} from './constants';

// initial location state
const initialLocationState = fromJS({
  path: '',
  query: {},
});
/**
 * Update location in store
 * @param {object} [state] current location
 * @param {object} action the action id
 * @return {object} updated state
 */
function locationReducer(state = initialLocationState, action) {
  switch (action.type) {
    case LOCATION_UPDATE:
      return action.location ? fromJS(action.location) : initialLocationState;
    default:
      return state;
  }
}

/**
 * Set announcement message
 * @param {object} [state] current announcement and location
 * @param {object} action the action
 * @return {object} updated state
 */
function announcementReducer(state = fromJS({ msg: '', path: '', query: '' }), action) {
  if (action.type === NAVIGATION_OCCURED) {
    // announce path if changed
    if (action.path !== state.get('path')) {
      const navItem = find(NAVITEMS, (i) => i.path === action.path);
      const locationLabel = navItem
        ? getLabel(navItem.label)
        : getLabel(`component.${action.path}.title`) || action.path;

      return fromJS({
        msg: `${getLabel('screenreader.navigationOccured')}: ${locationLabel}`,
        path: action.path,
        query: action.query,
      });
    }
    // announce query if changed
    if (action.query !== state.get('query')) {
      return state
        .set('query', action.query)
        .set('msg', getLabel('screenreader.navigationQueryUpdated'));
    }
    return state;
  }
  return state;
}

/**
  * Convert all data fields to string
  * @param {object} data the loaded data object
  */
function convertToString(data) {
  return data.map((d) => d.map((v) => v === null ? v : String(v)));
}

/**
 * Record data request, store loaded data
 * @param {object} [state] current data state
 * @param {object} action the action
 * @return {object} updated state
 */
function dataReducer(state = fromJS(DATA), action) {
  switch (action.type) {
    case DATA_REQUESTED:
      // remember request time
      return state.setIn([action.key, 'requested'], action.timestamp);
    case DATA_LOADED:
      // remember data
      return state.setIn([action.key, 'data'], convertToString(fromJS(action.data)));
    default:
      return state;
  }
}

/**
 * Creates the main reducer with the asynchronously loaded ones
 */
export default function createReducer() {
  return combineReducers({
    location: locationReducer,
    announcement: announcementReducer,
    data: dataReducer,
  });
}
