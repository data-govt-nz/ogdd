import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import appSagas from 'containers/App/sagas';
import reducer from 'containers/App/reducers';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}) {
  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [sagaMiddleware];
  if (process.env.NODE_ENV !== 'production') middlewares.push(logger);

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
    reducer,
    initialState,
    composeEnhancers(...enhancers)
  );

  // Load app level sagas
  sagaMiddleware.run(appSagas);

  store.runSaga = sagaMiddleware.run;
  store.asyncReducers = {}; // Async reducer registry

  if (module.hot) {
    module.hot.accept('containers/App/reducers', () => store.replaceReducer(reducer));
  }

  return store;
}
