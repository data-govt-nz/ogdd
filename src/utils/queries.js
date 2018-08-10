/**
  * A collection of helper functions for dealing with hash path and query objects and strings
  *
  * @author [tmfrnz](https://github.com/tmfrnz)
  */
import reduce from 'lodash/reduce';
import find from 'lodash/find';
import extend from 'lodash/extend';

/**
  * extract search query (?...) from router hash parameters and return as query object
  *
  * @param {array} params array of hash parameters provided by router ([param1, param2, param3] getHashParameters() by https://github.com/mvolkmann/react-hash-route)
  * @return {object} search query in object form
  */
export const queryObject = (params) => {
  // the current query string: "?..."
  const currentQueryString = find(params, (param) => param[0] === '?');
  // convert string to array
  const currentQueryArray = currentQueryString && currentQueryString.replace('?', '').split('&');
  // convert array to object
  return currentQueryArray
    ? reduce(currentQueryArray, (memo, value) =>
      extend(memo, value.split('=').length > 1
        ? { [value.split('=')[0]]: value.split('=')[1] }
        : { [value.split('=')[0]]: true }
      )
    , {})
    : {};
};

/**
  * Convert query object to query string
  *
  * @param {object} query the query object
  * @return {string} the query string
  */
export const queryString = (query) =>
  reduce(query, (memo, value, key) =>
    `${memo}${memo.length > 0 ? '&' : ''}${key}=${value}`
  , '');

/**
  * Combine path and query string
  *
  * @param {string} path the path
  * @param {string} query the query string
  * @return {string} combined string of path and query
  */
// get route in string form from path and query strings
export const routeString = (path, query) => {
  const q = query.length > 0 ? (`/?${query}`) : '';
  return `${path}${q}`;
};
