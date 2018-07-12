import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { LiveAnnouncer, LiveMessage } from 'react-aria-live';

import Header from 'containers/Header';

import { selectAnnouncement } from 'containers/App/selectors';
import { NAVITEMS } from './constants';

/**
 *
 * @return {Component} react base component
 */
class App extends React.Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
  }
  componentDidMount() {
    console.log('componentDidMount')
    this.focus();
  }
  componentDidUpdate() {
    console.log('componentDidUpdate')
    this.focus();
  }

  focus() {
    console.log('focus')
    // Explicitly focus the text input using the raw DOM API
    // Note: we're accessing "current" to get the DOM node
    this.container.current.focus();
  }


  render() {
    const { component, announcement } = this.props;
    return (
      <div
        tabIndex="-1"
        aria-labelledby="pageTitle"
        ref={this.container}
      >
        <LiveAnnouncer>
          <LiveMessage message={announcement} aria-live="polite" />
          <Header navItems={NAVITEMS} />
          <main
            role="main"
          >
            { component }
          </main>
        </LiveAnnouncer>
      </div>
    );
  }
}

App.propTypes = {
  component: PropTypes.element.isRequired,
  announcement: PropTypes.string,
};

const mapStateToProps = (state) => ({
  announcement: selectAnnouncement(state),
});

export default connect(mapStateToProps, null)(App);
