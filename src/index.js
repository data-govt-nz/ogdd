/* eslint-disable import/no-extraneous-dependencies */
/*
  issue with redux-logger and react-hot-loader
  even tho those 2 deps are only used in development
  eslint has no way to tell that and outputs an error
*/

// react deps
import React from 'react';
import ReactDOM from 'react-dom';
// hot reload for development
import { AppContainer } from 'react-hot-loader';
// redux deps
import { Provider } from 'react-redux';
// simple hash router: react-hash-route
import { routeSetup, getHash, getHashParameters } from 'react-hash-route';

import configureStore from 'store';

import App from 'containers/App';

import { queryObject } from 'utils/queries';

// Import CSS reset and Global Styles
import './global-styles';

const store = configureStore();
const root = document.getElementById('root');

const componentHashMap = {};

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component
          component={componentHashMap[getHash() || 'home']}
          location={{
            path: getHash(),
            query: queryObject(getHashParameters()),
          }}
        />
      </Provider>
    </AppContainer>,
    root,
  );
};

// start the application with route setup, component and messages
const start = () => routeSetup(() => render(App));

start();

if (module.hot) {
  module.hot.accept('containers/App/', () => start());
}
