import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { LiveAnnouncer, LiveMessage } from 'react-aria-live';

import getLabel from 'utils/get-label';

import Label from 'components/Label';
import Header from 'components/Header';
import SkipContent from 'styles/SkipContent';

import { selectAnnouncement } from 'containers/App/selectors';
import { NAVITEMS, DATA } from './constants';
import { loadData } from './actions';

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
    this.props.loadData();
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
  loadData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  announcement: selectAnnouncement(state),
});

function mapDispatchToProps(dispatch) {
  return {
    loadData: () => {
      Object.keys(DATA).forEach((key) => dispatch(loadData(key, DATA[key])));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
