import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
// import logger from 'redux-logger';
import { fromJS } from 'immutable';

import appSagas from 'containers/App/sagas';
import createReducer from 'containers/App/reducers';

const sagaMiddleware = createSagaMiddleware();

/**
 * Set up app store
 * @param {object} initialState the initial state of the store
 * @return {number} updated state
 */
export default function configureStore(initialState = {}) {
  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [sagaMiddleware];
  // if (process.env.NODE_ENV !== 'production') middlewares.push(logger);

  const enhancers = [
    applyMiddleware(...middlewares),
  ];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
  /* eslint-enable */

  const store = createStore(
    createReducer(),
    fromJS(initialState),
    composeEnhancers(...enhancers)
  );

  // Load app level sagas
  sagaMiddleware.run(appSagas);

  store.runSaga = sagaMiddleware.run;
  store.asyncReducers = {}; // Async reducer registry

  if (module.hot) {
    module.hot.accept('containers/App/reducers', () => store.replaceReducer(createReducer));
  }

  return store;
}
