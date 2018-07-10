import reduce from 'lodash/reduce';
import find from 'lodash/find';
import extend from 'lodash/extend';

// get search query in object form from params array as provided by router function
export const queryObject = (params) => {
  // the current query string: "?..."
  const currentQueryString =
    find(params, (param) => param[0] === '?');
  // convert string to array
  const currentQueryArray =
    currentQueryString && currentQueryString.replace('?', '').split('&');
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

export const queryString = (query) =>
  reduce(query, (memo, value, key) =>
    `${memo}${memo.length > 0 ? '&' : ''}${key}=${value}`
  , '');

export const routeString = (path, query) => {
  const q = query.length > 0 ? (`/?${query}`) : '';
  return `${path}${q}`;
};
