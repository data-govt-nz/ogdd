/**
  * Application actions
  * @ignore
  *
  */
import {
  LOCATION_UPDATE,
  NAVIGATE,
  NAVIGATION_OCCURED,
  LOAD_DATA,
  DATA_REQUESTED,
  DATA_LOADED,
  LOAD_ERROR,
} from './constants';

/**
 * remember location in store
 * @param {object} location new location
 * @return {object} `{type: action id, location: new location}`
 */
export function updateLocation(location) {
  return {
    type: LOCATION_UPDATE,
    location,
  };
}

/**
 * navigate to new location
 * @param {object} location new location
 * @param {object} args navigation arguments
   * @return {object} `{type: action id, location: new location, args: navigation arguments}`
 */
export function navigate(location, args) {
  return {
    type: NAVIGATE,
    location,
    args,
  };
}
/**
 * navigation occured
 * @param {string} path new path
 * @param {string} query new query
 * @return {object} `{type: action id, path, query}`
 */
export function navigationOccured(path, query) {
  return {
    type: NAVIGATION_OCCURED,
    path,
    query,
  };
}

/**
 * load data for table
 * @param {string} key key of data table to load
 * @param {object} value empty data object
 * @return {object} `{type: action id, key, value}`
 */
export function loadData(key, value) {
  return {
    type: LOAD_DATA,
    key,
    value,
  };
}

/**
 * load error for table
 * @param {string} key key of data table failed loading
 * @return {object} `{type: action id, key}`
 */
export function loadError(key) {
  return {
    type: LOAD_ERROR,
    key,
  };
}

/**
 * request data for table
 * @param {string} key key of data table to load
 * @param {object} timestamp timestamp of request
 * @return {object} `{type: action id, key, timestamp}`
 */
export function dataRequested(key, timestamp) {
  return {
    type: DATA_REQUESTED,
    key,
    timestamp,
  };
}

/**
 * data loaded for table
 * @param {string} key key of data table to load
 * @param {object} data loaded data
 * @return {object} `{type: action id, key, data}`
 */
export function dataLoaded(key, data) {
  return {
    type: DATA_LOADED,
    key,
    data,
  };
}
