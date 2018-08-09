import { call, takeEvery, select, put } from 'redux-saga/effects';
import { route, getHash, getHashParameters } from 'react-hash-route';
import { csvParse } from 'd3-dsv';
import 'whatwg-fetch';
import fetchJsonp from 'fetch-jsonp';

import extend from 'lodash/extend';

import { queryObject, queryString, routeString } from 'utils/queries';

import { NAVIGATE, LOAD_DATA } from './constants';
import { selectRequestedAt } from './selectors';
import { dataRequested, loadError, dataLoaded, navigationOccured } from './actions';

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
  let path = '';
  if (typeof location === 'string') {
    path = location;
  } else if (typeof location.path !== 'undefined') {
    path = location.path;
  } else {
    path = hash;
  }

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
  yield put(navigationOccured(path, query));
}

export function* loadDataSaga({ key, value }) {
  const requestedAt = yield select(selectRequestedAt, key);
  if (!requestedAt) {
    try {
      // First record that we are requesting
      yield put(dataRequested(key, Date.now()));
      if (value.source === 'json') {
        // fetch json file
        const path = `${value.path}${value.filename}`;
        const response = yield fetch(
          window.global.OGDD_JS_PATH
          ? `${window.global.OGDD_JS_PATH}${path}`
          : path
        );
        const responseBody = yield response.json();
        if (responseBody) {
          yield put(dataLoaded(key, responseBody));
        }
      }
      if (value.source === 'api') {
        // fetch data from data.govt api (CKAN, see http://docs.ckan.org/en/latest/maintaining/datastore.html#api-reference)
        // limit parameter defaults to 100, setting high number to practically turn limits off - after 10 years we should not have more than 1000 rows
        const path = `${value.path}?resource_id=${value.resourceId}&limit=999999`;
        const response = yield fetchJsonp(path);
        const responseBody = yield response.json();
        if (responseBody) {
          yield put(dataLoaded(key, responseBody.result.records));
        }
      }
      if (value.source === 'csv') {
        const path = `${value.path}${value.filename}`;
        const response = yield fetch(
          window.global.OGDD_JS_PATH
          ? `${window.global.OGDD_JS_PATH}${path}`
          : path
        );
        const responseBody = yield response.text();
        if (responseBody) {
          yield put(dataLoaded(key, csvParse(responseBody)));
        }
      }
    } catch (err) {
      // Whoops Save error
      yield put(loadError(err, key));
      // Clear the request time on error, This will cause us to try again next time, which we probably want to do?
      yield put(dataRequested(key, null));
    }
  }
}

/**
 * Root saga manages watcher lifecycle
 * @return {void}
 */
export default function* rootSaga() {
  yield takeEvery(NAVIGATE, navigateSaga);
  yield takeEvery(LOAD_DATA, loadDataSaga);
}
