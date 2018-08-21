// vendor
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { LiveAnnouncer, LiveMessage } from 'react-aria-live';
import styled from 'styled-components';
// utils
import getLabel from 'utils/get-label';
// components
import Label from 'components/Label';
import Header from 'containers/Header';
// simple styles
import SkipContent from 'styles/SkipContent';
// App actions, selectors, constants
import { loadData } from './actions';
import { selectAnnouncement } from './selectors';
import { NAVITEMS, DATA, BREAKPOINTS } from './constants';

// component styles
const Styled = styled.div`
  &:focus { outline: none; }
`;
const Main = styled.main`
  margin-top: -100px;
  padding-top: 100px;
  min-height: 100vH;
  @media (min-width: ${(props) => props.theme.breakpoints[BREAKPOINTS.SMALL]}) {
    padding-top: 120px;
  }
  @media (min-width: ${(props) => props.theme.breakpoints[BREAKPOINTS.MEDIUM]}) {
    margin-top: -70px;
    padding-top: 110px;
  }
  &:focus { outline: none; }
`;

/**
  * Principal App component
  * - wraps path dependent container components
  * - notifies screenreader about navigation events
  *
  * @return {Component} react base component
  *
  */
class App extends React.Component {
  /**
    * Component constructor, sets initial state,
    * Stores component references to manage keyboard focus
    * @param {object} props component props
    */
  constructor(props) {
    super(props);
    this.container = React.createRef();
    this.main = React.createRef();
    this.state = {
      windowWidth: window.innerWidth,
    };
  }
  /**
    * Set focus when component mounts and trigger loading of all external data
    */
  componentDidMount() {
    this.focus();
    this.props.loadData();
  }
  /**
    * Set focus when component updates
    */
  componentDidUpdate() {
    this.focus();
  }
  /**
    * Set focus to app container
    * Note: we're accessing "current" to get the DOM node
    */
  focus() {
    this.container.current.focus();
  }
  /**
    * Skip to content button handler: sets focus to main content
    * Note: we're accessing "current" to get the DOM node
    */
  skipToContent() {
    this.main.current.focus();
  }
  render() {
    const { component, announcement } = this.props;
    return (
      <Styled
        tabIndex="-1"
        aria-labelledby="pageTitle"
        innerRef={this.container}
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
          <Main
            role="main"
            innerRef={this.main}
            tabIndex="-1"
            aria-labelledby="pageTitle"
          >
            { component }
          </Main>
        </LiveAnnouncer>
      </Styled>
    );
  }
}

App.propTypes = {
  /** the path dependent container component */
  component: PropTypes.element.isRequired,
  /** navigation announcement for screenreader */
  announcement: PropTypes.string,
  /** load data action */
  loadData: PropTypes.func.isRequired,
};

/**
 * Mapping redux state to component props
 *
 * @param {object} state application store
 * @return {object} object of selected store content
 */
const mapStateToProps = (state) => ({
  announcement: selectAnnouncement(state),
});

/**
 * Mapping redux dispatch function to component props
 *
 * @param {function} dispatch redux dispatch function for dispatching actions
 * @return {object} object of functions for dispatching actions
 */
const mapDispatchToProps = (dispatch) => ({
  // load data for every item in DATA array
  loadData: () => {
    Object.keys(DATA).forEach((key) => dispatch(loadData(key, DATA[key])));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
