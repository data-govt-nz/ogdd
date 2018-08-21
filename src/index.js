/**
  * React application entry point
  *
  * - starts application
  * - configures app store
  * - sets up app routes
  * - renders app according to route
  * - remembers hash/route changes
  * - ties in global styles
  */

/* eslint-disable import/no-extraneous-dependencies */
/*
  issue with react-hot-loader:
  even tho only used in development eslint has no way to tell that and outputs an error
*/

// vendor
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { routeSetup, getHash, getHashParameters } from 'react-hash-route';
import { ThemeProvider } from 'styled-components';

// store
import configureStore from 'store';

// containers
import App from 'containers/App';
import PathFocusAreas from 'containers/PathFocusAreas';
import PathFocusAreaSingle from 'containers/PathFocusAreaSingle';
import PathInsights from 'containers/PathInsights';
import PathServices from 'containers/PathServices';
import PathAssets from 'containers/PathAssets';
import PathAbout from 'containers/PathAbout';
import PathNotFound from 'containers/PathNotFound';
import { updateLocation } from 'containers/App/actions';
import { THEME } from 'containers/App/constants';

// utils
import { queryObject } from 'utils/queries';

// Styles
// import react-vis styles
import 'react-vis/dist/styles/legends.scss';
import 'react-vis/dist/styles/plot.scss';
// global application styles & resets
import './global-styles';


// configure app store
const store = configureStore();

// Map hash path to react component
// see also containers/App/constants NAVITEMS
const pathComponentMap = {
  '': <PathFocusAreas />, // focus areas
  'focus-area': <PathFocusAreaSingle />,
  insights: <PathInsights />,
  services: <PathServices />,
  assets: <PathAssets />,
  about: <PathAbout />,
  'not-found': <PathNotFound />,
};

/**
  * Render React application and attach to 'ogdd-root' element.
  * Also records current location in store
  * @param {Component} Component main react component
  */
const render = (Component) => {
  // remember current hash location in store
  store.dispatch(updateLocation({
    path: getHash(),
    query: queryObject(getHashParameters()),
  }));
  // render DOM
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <ThemeProvider
          theme={THEME}
        >
          <Component
            component={pathComponentMap[getHash() || ''] || pathComponentMap['not-found']}
          />
        </ThemeProvider>
      </Provider>
    </AppContainer>,
    document.getElementById('ogdd-root'),
  );
};

// start the application with route setup, and component
const start = () => routeSetup(() => render(App));
start();

if (module.hot) {
  module.hot.accept('/', () => start());
}
