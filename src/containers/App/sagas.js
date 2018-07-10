import { call, takeEvery } from 'redux-saga/effects';
import { route, getHash, getHashParameters } from 'react-hash-route';

import { extend } from 'lodash/object';

import { queryObject, queryString, routeString } from 'utils/queries';

import { NAVIGATE } from './constants';

/**
 * Navigate to location, calls router
 * @param {object} payload location: the new location, args: query arguments
 * @return {void}
 */
export function* navigateSaga({ location, args }) {
  const hash = yield getHash();
  const params = yield queryObject(getHashParameters());

  // default args
  const xArgs = extend({
    remove: true,
  }, args || {});

  // update path: replace or keep if not provided
  const path = typeof location === 'string' ? location : (location.path || hash);
  // update search query
  let query = '';
  if (location.query) {
    query = queryString(xArgs.remove
      // remove: ignore all previous params and only use new params
      ? location.query
      // keep: merge previous and new params
      : extend(params, location.query)
    );
  }
  // combine path and query if present
  yield call(route, routeString(path, query));
}


/**
 * Root saga manages watcher lifecycle
 * @return {void}
 */
export default function* rootSaga() {
  yield takeEvery(NAVIGATE, navigateSaga);
}