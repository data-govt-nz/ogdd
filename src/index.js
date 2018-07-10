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

// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider';
import { DEFAULT_LOCALE } from 'containers/LanguageProvider/constants';

import { queryObject } from 'utils/queries';

import 'style.scss';

// Import i18n messages
import { translationMessages } from './i18n';

const store = configureStore();
const root = document.getElementById('root');

const componentHashMap = {};

const render = (Component, messages) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <LanguageProvider messages={messages} locale={DEFAULT_LOCALE}>
          <Component
            component={componentHashMap[getHash() || 'home']}
            location={{
              path: getHash(),
              query: queryObject(getHashParameters()),
            }}
          />
        </LanguageProvider>
      </Provider>
    </AppContainer>,
    root,
  );
};

// start the application with route setup, component and messages
const start = () => routeSetup(() => render(App, translationMessages));

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  (new Promise((resolve) => {
    resolve(import('intl'));
  }))
    .then(() => Promise.all([
      import('intl/locale-data/jsonp/en.js'),
    ]))
    .then(() => start())
    .catch((err) => {
      throw err;
    });
} else {
  start();
}

if (module.hot) {
  module.hot.accept('containers/App/', () => start());
  module.hot.accept('./i18n', () => start());
}
