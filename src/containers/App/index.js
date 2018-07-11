import React from 'react';
import PropTypes from 'prop-types';
import Header from 'containers/Header';

import { NAVITEMS } from './constants';

/**
 *
 * @return {Component} react base component
 */
const App = ({ component }) => (
  <div>
    <Header navItems={NAVITEMS} />
    <main>
      { component }
    </main>
  </div>
);

App.propTypes = {
  component: PropTypes.element.isRequired,
};

export default App;
