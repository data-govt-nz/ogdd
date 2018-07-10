import { LOCATION_UPDATE } from './constants';

/**
 * Manages the counter value
 * by chosing which action should be used
 * when the user clicks one of the 2 available buttons.
 * the functions are under /actions
 * @param {number} state times clicked
 * @param {string} action used to identify which action to execute
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
