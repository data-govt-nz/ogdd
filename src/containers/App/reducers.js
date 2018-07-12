import { combineReducers } from 'redux';
import find from 'lodash/find';

import getLabel from 'utils/get-label';
import { NAVITEMS } from 'containers/App/constants';

import { LOCATION_UPDATE, NAVIGATE } from './constants';

const initialLocationState = {
  path: '',
  query: {},
};
/**
 * Update location in store
 * @param {object} state current location
 * @param {string} action the action id
 * @return {number} updated state
 */
function locationReducer(state = initialLocationState, action) {
  switch (action.type) {
    case LOCATION_UPDATE:
      return action.location || initialLocationState;
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

/**
 * Creates the main reducer with the asynchronously loaded ones
 */
export default function createReducer(asyncReducers) {
  return combineReducers({
    location: locationReducer,
    announcement: announcementReducer,
    ...asyncReducers,
  });
}
