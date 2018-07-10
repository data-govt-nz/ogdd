import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Label from 'components/Label';

// import reactLogo from 'assets/React-icon.png';
// <img alt="react logo" src={reactLogo} />

import { updateLocation, navigate } from './actions';

/**
 *
 * @return {Component} react base component
 */
class App extends React.Component {

  // remember current hash location in store
  componentWillReceiveProps(nextProps) {
    if (nextProps.location) {
      this.props.updateLocation(nextProps.location);
    }
  }

  render() {
    const { nav } = this.props;
    return (
      <main>
        <div>
          <h1>
            <Label id="app.title" />
          </h1>
          <p><Label id="test" /></p>
        </div>
        <ul>
          <li>
            <a href="#home" onClick={() => nav('home')}>Home</a>
          </li>
          <li>
            <a href="#about" onClick={() => nav('about')}>About</a>
          </li>
          <li>
            <a href="#about/?a=1" key="sdfhadf" onClick={() => nav({ path: 'about', query: { a: 1 } }, { remove: true })}>Query test a=1</a>
          </li>
        </ul>
      </main>
    );
  }
}


App.propTypes = {
  location: PropTypes.object.isRequired,
  // component: PropTypes.element.isRequired,
  nav: PropTypes.func.isRequired,
  updateLocation: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  // remember location in store
  updateLocation: (location) => {
    dispatch(updateLocation(location));
  },
  // navigate to location
  nav: (location, args) => {
    dispatch(navigate(location, args));
  },
});

export default connect(null, mapDispatchToProps)(App);
