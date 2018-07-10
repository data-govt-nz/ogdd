import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Label from 'components/Label';

import reactLogo from 'assets/React-icon.png';

import { updateLocation, navigate } from './actions';

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
    // const { component, navigate } = this.props;
    return (
      <main className="container">
        <div>
          <h1>
            <Label id="app.title" />
          </h1>
          <img className="container__image" alt="react logo" src={reactLogo} />
          <p><Label id="test" /></p>
        </div>
        <ul className="left">
          <li>
            <a href="#home" onClick={() => navigate('home')}>Home</a>
          </li>
          <li>
            <a href="#about" onClick={() => navigate('about')}>About</a>
          </li>
          <li>
            <a href="#about/?a=1" key="sdfhadf" onClick={() => navigate({ path: 'about', query: { a: 1 } }, { remove: true })}>Query test a=1</a>
          </li>
        </ul>
      </main>
    );
  }
}


App.propTypes = {
  location: PropTypes.object.isRequired,
  // component: PropTypes.element.isRequired,
  // navigate: PropTypes.func.isRequired,
  updateLocation: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  // remember location in store
  updateLocation: (location) => {
    dispatch(updateLocation(location));
  },
  // navigate to location
  navigate: (location, args) => {
    dispatch(navigate(location, args));
  },
});

export default connect(null, mapDispatchToProps)(App);
