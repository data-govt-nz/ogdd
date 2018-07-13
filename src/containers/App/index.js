import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { LiveAnnouncer, LiveMessage } from 'react-aria-live';
import getLabel from 'utils/get-label';

import Label from 'components/Label';
import Header from 'components/Header';
import SkipContent from 'styles/SkipContent';

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
    this.main = React.createRef();
    this.state = {
      windowWidth: window.innerWidth,
    };
  }
  componentDidMount() {
    this.focus();
  }
  componentDidUpdate() {
    this.focus();
  }
  focus() {
    // Explicitly focus the app container
    // Note: we're accessing "current" to get the DOM node
    this.container.current.focus();
  }

  skipToContent() {
    this.main.current.focus();
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
          <SkipContent
            onClick={() => this.skipToContent()}
            title={getLabel('screenreader.skipToContent')}
          >
            <Label id="screenreader.skipToContent" />
          </SkipContent>
          <Header navItems={NAVITEMS} />
          <main
            role="main"
            ref={this.main}
            tabIndex="-1"
            aria-labelledby="pageTitle"
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
