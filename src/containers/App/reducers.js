import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import find from 'lodash/find';

import getLabel from 'utils/get-label';
import { NAVITEMS } from 'containers/App/constants';

import {
  LOCATION_UPDATE,
  NAVIGATE,
  DATA,
  DATA_REQUESTED,
  DATA_LOADED,
} from './constants';

const initialLocationState = fromJS({
  path: '',
  query: {},
});
/**
 * Update location in store
 * @param {object} state current location
 * @param {string} action the action id
 * @return {number} updated state
 */
function locationReducer(state = initialLocationState, action) {
  switch (action.type) {
    case LOCATION_UPDATE:
      return fromJS(action.location) || initialLocationState;
    default:
      return state;
  }
}

/**
 * Set announcement message
 * @param {string} state current announcement
 * @param {string} action the action id
 * @return {number} updated state
 */
function announcementReducer(state = '', action) {
  if (action.type === NAVIGATE) {
    const path = action.location.path || action.location;
    const navItem = find(NAVITEMS, (i) => i.path === path);
    return state !== action.location.path
      ? `${getLabel('screenreader.navigationOccured')}: ${navItem ? getLabel(navItem.label) : action.location.path}`
      : '';
  }
  return state;
}

function dataReducer(state = fromJS(DATA), action) {
  switch (action.type) {
    case DATA_REQUESTED:
      return state.setIn([action.key, 'requested'], action.timestamp);
    case DATA_LOADED:
      return state.setIn([action.key, 'data'], fromJS(action.data));
    default:
      return state;
  }
}

/**
 * Creates the main reducer with the asynchronously loaded ones
 */
export default function createReducer(asyncReducers) {
  return combineReducers({
    location: locationReducer,
    announcement: announcementReducer,
    data: dataReducer,
    ...asyncReducers,
  });
}
