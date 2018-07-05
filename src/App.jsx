import React from 'react';
import PropTypes from 'prop-types';

import {
  BrowserRouter,
  Link,
} from 'react-router-dom';

import Routes from './Routes';

import reactLogo from './assets/React-icon.png';

/**
 * this container is defined as class so we can modify state
 * @return {Component} react base component
 */
const App = ({ config }) => (
  <BrowserRouter basename={config.pathname}>
    <main className="container">
      <div>
        <h1>hello redux!</h1>
        <img className="container__image" alt="react logo" src={reactLogo} />
        <p>If you see this everything is working!</p>
      </div>
      <ul className="left">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
      <Routes />
    </main>
  </BrowserRouter>
);

App.propTypes = {
  config: PropTypes.object,
};

export default App;
