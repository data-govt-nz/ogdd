import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import find from 'lodash/find';

import getLabel from 'utils/get-label';
import { NAVITEMS } from 'containers/App/constants';

import {
  LOCATION_UPDATE,
  NAVIGATION_OCCURED,
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
 * @param {string} state current announcement and location
 * @param {string} action the action id
 * @return {object} updated state
 */
function announcementReducer(state = fromJS({ msg: '', path: '', query: '' }), action) {
  if (action.type === NAVIGATION_OCCURED) {
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
    if (action.query !== state.get('query')) {
      return state
        .set('query', action.query)
        .set('msg', getLabel('screenreader.navigationQueryUpdated'));
    }
    return state;
  }
  return state;
}

function convertToString(data) {
  return data.map((d) => d.map((v) => v === null ? v : String(v)));
}

function dataReducer(state = fromJS(DATA), action) {
  switch (action.type) {
    case DATA_REQUESTED:
      return state.setIn([action.key, 'requested'], action.timestamp);
    case DATA_LOADED:
      return state.setIn([action.key, 'data'], convertToString(fromJS(action.data)));
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
