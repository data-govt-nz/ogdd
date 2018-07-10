import { LOCATION_UPDATE } from './constants';

/**
 * Update location in store
 * @param {object} state current location
 * @param {string} action the action id
 * @return {number} updated state
 */
export default function routeReducer(state = {}, action) {
  switch (action.type) {
    case LOCATION_UPDATE:
      return action.location || {};
    default:
      return state;
  }
}
