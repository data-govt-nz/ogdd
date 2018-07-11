import { combineReducers } from 'redux';
import { LOCATION_UPDATE } from './constants';

const initialState = {
  path: '',
  query: {},
};

/**
 * Update location in store
 * @param {object} state current location
 * @param {string} action the action id
 * @return {number} updated state
 */
function locationReducer(state = initialState, action) {
  switch (action.type) {
    case LOCATION_UPDATE:
      return action.location || initialState;
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
    ...asyncReducers,
  });
}
