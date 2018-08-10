/**
  * Description
  *
  * @author [tmfrnz](https://github.com/tmfrnz)
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
 * @return {location}
 */
export function updateLocation(location) {
  return {
    type: LOCATION_UPDATE,
    location,
  };
}

/**
 * navigate to new location
 * @return {location}
 */
export function navigate(location, args) {
  return {
    type: NAVIGATE,
    location,
    args,
  };
}
export function navigationOccured(path, query) {
  return {
    type: NAVIGATION_OCCURED,
    path,
    query,
  };
}

/**
 * load data for key
 * @return {key, value}
 */
export function loadData(key, value) {
  return {
    type: LOAD_DATA,
    key,
    value,
  };
}

/**
 * load data for key
 * @return {key, value}
 */
export function loadError(key) {
  return {
    type: LOAD_ERROR,
    key,
  };
}

/**
 * load data for key
 * @return {key, value}
 */
export function dataRequested(key, timestamp) {
  return {
    type: DATA_REQUESTED,
    key,
    timestamp,
  };
}

/**
 * store data for key
 * @return {key, data}
 */
export function dataLoaded(key, data) {
  return {
    type: DATA_LOADED,
    key,
    data,
  };
}
