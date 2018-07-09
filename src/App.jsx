import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from './actions';

import reactLogo from './assets/React-icon.png';

/**
 *
 * @return {Component} react base component
 */

class App extends React.Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.location) {
      this.props.updateLocation(nextProps.location);
    }
  }

  render() {
    const { component, navigate } = this.props;
    return (
      <main className="container">
        <div>
          <h1>hello redux!</h1>
          <img className="container__image" alt="react logo" src={reactLogo} />
          <p>If you see this everything is working!</p>
        </div>
        <ul className="left">
          <li>
            <a key="home" onClick={() => navigate('home')}>Home</a>
          </li>
          <li>
            <a key="about" onClick={() => navigate('about')}>About</a>
          </li>
          <li>
            <a
              key="sdfhadf"
              onClick={() => navigate({
                path: 'about',
                query: { a: 1 },
              }, {
                remove: true,
              })}
            >
              Query test a=1
            </a>
          </li>
          <li>
            <a
              key="sdfhadf"
              onClick={() => navigate({ query: { a: 2 } })}
            >
              Query test a=2
            </a>
          </li>
          <li>
            <a
              key="sdfhadf"
              onClick={() => navigate(
                { query: {b: true} },
                { remove: false }
              )}
            >
              Query test b=3
            </a>
          </li>
        </ul>
        {component}
      </main>
    );
  };
};
//

App.propTypes = {
  location: PropTypes.object.isRequired,
  component: PropTypes.element.isRequired,
  navigate: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  // remember location in store
  updateLocation: (location) => {
    dispatch(actions.updateLocation(location));
  },
  // navigate to location
  navigate: (location, args) => {
    dispatch(actions.navigate(location, args))
  }
});

export default connect(null, mapDispatchToProps)(App);
