/**
  * Application sagas to trigger side effects in repsonse to actions
  *
  * @ignore
  */
// vendor
import { call, takeEvery, select, put } from 'redux-saga/effects';
import { route, getHash, getHashParameters } from 'react-hash-route';
import { csvParse } from 'd3-dsv';
import 'whatwg-fetch';
import fetchJsonp from 'fetch-jsonp';
import extend from 'lodash/extend';
// utils
import { queryObject, queryString, routeString } from 'utils/queries';
// app constants, selectors, actions
import { NAVIGATE, LOAD_DATA } from './constants';
import { selectRequestedAt } from './selectors';
import { dataRequested, loadError, dataLoaded, navigationOccured } from './actions';

const MAX_LOAD_ATTEMPTS = 5;

/**
 * Generator function. Navigate Saga:
 * - Composes to new route string for location
 * - Calls router
 * - Also makes sure page is scrolled to top on hash change
 *
 * @param {object} payload location: the new location, args: query arguments
 */
function* navigateSaga({ location, args }) {
  // get route hash
  const hash = yield getHash();
  // get query from route params
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
  if (path !== hash) {
    yield call(window.scrollTo, 0, 0);
  }
}

/**
 * Generator function. Function for restarting sagas multiple times before giving up and calling the error handler.
 * - following https://codeburst.io/try-again-more-redux-saga-patterns-bfbc3ffcdc
 *
 * @param {function} generator the saga generator to be restarted
 * @param {function} handleError the error handler after X unsuccessful tries
 * @param {integer} maxTries the maximum number of tries
 */
const autoRestart = (generator, handleError, maxTries = MAX_LOAD_ATTEMPTS) => function* autoRestarting(...args) {
  let n = 0;
  while (n < maxTries) {
    n += 1;
    try {
      yield call(generator, ...args);
      break;
    } catch (err) {
      if (n >= maxTries) {
        yield handleError(err, ...args);
      }
    }
  }
};


/**
 * Generator function. Load data saga:
 * - Load data from API or files
 * - Dispatch load event with loaded data
 * - Resets request time on error
 *
 * @param {object} payload {key: data set key, value: data set definition}
 */
function* loadDataSaga({ key, value }) {
  // check if already loading
  const requestedAt = yield select(selectRequestedAt, key);
  // only load when not already loading
  if (!requestedAt) {
    try {
      // first record that we are requesting (preventing to load again)
      yield put(dataRequested(key, Date.now()));
      // load from API
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
      // load from JSON file
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
      // load from CSV file
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
      // clear the request time on error, and try again
      yield put(dataRequested(key, null));
      // throw error
      throw new Error(err);
    }
  }
}
/**
 * Generator function. Load data error handler:
 * - Record load error
 *
 * @param {object} payload {key: data set key}
 */
function* loadDataErrorHandler(err, { key }) {
  yield put(loadError(key, err));
}

/**
 * Generator function. Root saga manages watcher lifecycle for navigate and loadData sagas
 * loadDataSaga is restarted several times before thorwing an error
 *
 * @return {void}
 */
export default function* rootSaga() {
  yield takeEvery(NAVIGATE, navigateSaga);
  yield takeEvery(LOAD_DATA, autoRestart(loadDataSaga, loadDataErrorHandler, MAX_LOAD_ATTEMPTS));
}
