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
import {routeSetup, getHash, getHashParameters} from 'react-hash-route';

import { Home, About } from './containers';
import configureStore from './store';

import App from './App';

import { queryObject } from './utils/queries';

import './style.scss';

const store = configureStore();
const root = document.getElementById('root');

const componentHashMap = {
  home: <Home />,
  about: <About />,
};

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

// export const init = (config) => render(App);
routeSetup(() => render(App));

if (module.hot) {
  module.hot.accept('./App', () => { routeSetup(() => render(App)); });
}
