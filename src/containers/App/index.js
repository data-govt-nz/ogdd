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
import { NAVITEMS, DATA } from './constants';

// component styles
const Styled = styled.div`
  &:focus { outline: none; }
`;
const Main = styled.main`
  &:focus { outline: none; }
  padding-top: 10px;
  @media (min-width: ${(props) => props.theme.breakpoints[0]}) {
    padding-top: 20px;
  }
  @media (min-width: ${(props) => props.theme.breakpoints[1]}) {
    padding-top: 40px;
  }
`;

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
