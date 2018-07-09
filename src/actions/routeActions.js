
import { reduce, find } from 'lodash/collection';
import { extend } from 'lodash/object';

import {
  LOCATION_UPDATE,
  NAVIGATE,
} from './types';

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
