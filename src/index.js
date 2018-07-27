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
// Theme provider
import { ThemeProvider } from 'styled-components';

import configureStore from 'store';

import App from 'containers/App';
import PageFocusAreas from 'containers/PageFocusAreas';
import PageInsights from 'containers/PageInsights';
import PageServices from 'containers/PageServices';
import PageAssets from 'containers/PageAssets';
import PageNotFound from 'containers/PageNotFound';

import { updateLocation } from 'containers/App/actions';

import { queryObject } from 'utils/queries';

// import react-vis styles
import 'react-vis/dist/styles/legends.scss';
import 'react-vis/dist/styles/plot.scss';

// Import CSS reset and Global Styles
import './global-styles';


const store = configureStore();

// [
//   {
//     source: 'json',
//     filename:
//   },
// ]

// map hash path to react component
// see also containers/App/constants NAVITEMS
const pathComponentMap = {
  '': <PageFocusAreas />, // focus areas
  insights: <PageInsights />,
  services: <PageServices />,
  assets: <PageAssets />,
  'not-found': <PageNotFound />,
};

const render = (Component) => {
  // remember current hash location in store
  store.dispatch(updateLocation({
    path: getHash(),
    query: queryObject(getHashParameters()),
  }));
  // render DOM
  // breakpoints:
  // < 720px (45em): extra-small (mobile)
  // > XXXpx (63em): small (tablet portrait)
  // >= 1008px (63em): medium (tablet landscape, desktop)
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <ThemeProvider
          theme={{
            breakpoints: ['45em', '63em'],
            gutter: ['4px', '6px', '8px'],
            sizes: ['14px', '18px'],
            colors: {
              white: '#fff',
              light: '#E7E9EB',
              dark: '#8B969D',
              black: '#202326',
              fa1: '#491C8B',
              fa2: '#AD9300',
              fa3: '#00A2C7',
              fa4: '#199F8B',
              fa5: '#2956D1',
              fa6: '#FC6128',
              faPlotBackground: '#F4F5F5',
              faReference: '#D4D7D9',
              referenceLabel: '#4D5E65',
            },
          }}
        >
          <Component
            component={pathComponentMap[getHash() || ''] || pathComponentMap['not-found']}
          />
        </ThemeProvider>
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  );
};

// start the application with route setup, component and messages
const start = () => routeSetup(() => render(App));

start();

if (module.hot) {
  module.hot.accept('/', () => start());
}
