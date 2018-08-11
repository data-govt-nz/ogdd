// vendor
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import { Map } from 'immutable';
// utils
import getLabel from 'utils/get-label';
// containers
import { navigate } from 'containers/App/actions';
import { selectLocation } from 'containers/App/selectors';
import { BREAKPOINTS } from 'containers/App/constants';
import Menu from 'containers/Menu';
// components
import Label from 'components/Label';
import ScreenReaderOnly from 'styles/ScreenReaderOnly';
import Button from 'styles/Button';
import NavLink from 'styles/NavLink';
// assets
import logo from 'assets/logo.svg';

// component styles
const Styled = styled.header`
  height: 100px;
  text-align: center;
  @media (min-width: ${(props) => props.theme.breakpoints[BREAKPOINTS.MEDIUM]}) {
    height: 70px;
  }
`;
const Brand = styled(Button)`
  position: absolute;
  top: 0;
  left: 0;
  text-align: left;
`;
const Logo = styled.img`
  display: inline-block;
  vertical-align: middle;
  height: 50px;
  @media (min-width: ${(props) => props.theme.breakpoints[BREAKPOINTS.MEDIUM]}) {
    height: 70px;
  }
`;
const NavBar = styled.div`
  position: relative;
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.5);
  height: 50px;
  @media (min-width: ${(props) => props.theme.breakpoints[BREAKPOINTS.MEDIUM]}) {
    height: 70px;
  }
`;
const AboutLink = styled(NavLink)`
  position: absolute;
  top: 10px;
  right: 30px;
  box-shadow: none;
  min-width: 0;
  ${(props) => props.active && css`
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.2);
  `}
  @media (min-width: ${(props) => props.theme.breakpoints[BREAKPOINTS.SMALL]}) {
    right: 50px;
  }
  @media (min-width: ${(props) => props.theme.breakpoints[BREAKPOINTS.MEDIUM]}) {
    top: 20px;
  }
`;

/**
  * The application header for showing brand and menu
  *
  *
  */
const Header = ({ navItems, location, nav }) => (
  <Styled role="banner">
    <NavBar>
      <Brand onClick={() => nav('')} title={getLabel('screenreader.header.homeLink')}>
        <Logo alt={getLabel('app.title')} src={logo} />
      </Brand>
      <Menu navItems={navItems} visibleMin={BREAKPOINTS.MEDIUM} />
      <AboutLink
        active={location.get('path') === 'about'}
        onClick={() => nav('about')}
        title={getLabel('component.about.nav')}
      >
        <Label id="component.about.nav" />
        { location.get('path') === 'about' &&
          <ScreenReaderOnly id="currentItem">
            <Label id="screenreader.navActive" />
          </ScreenReaderOnly>
        }
      </AboutLink>
    </NavBar>
    <Menu navItems={navItems} hiddenMin={BREAKPOINTS.MEDIUM} />
  </Styled>
);

Header.propTypes = {
  /** Navigation action */
  nav: PropTypes.func.isRequired,
  /** Array of navigation item objects */
  navItems: PropTypes.array,
  /** the current location as selected from store */
  location: PropTypes.instanceOf(Map),
};

/**
 * Mapping redux state to component props
 *
 * @param {object} state application store
 * @return {object} object of selected store content
 */
const mapStateToProps = (state) => ({
  location: selectLocation(state),
});

/**
 * Mapping redux dispatch function to component props
 *
 * @param {function} dispatch redux dispatch function for dispatching actions
 * @return {object} object of functions for dispatching actions
 */
const mapDispatchToProps = (dispatch) => ({
  // navigate to location
  nav: (location, args) => {
    dispatch(navigate(location, args));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
