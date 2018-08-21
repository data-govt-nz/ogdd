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
import Icon from 'components/Icon';
// styles
import ScreenReaderOnly from 'styles/ScreenReaderOnly';
import NavLink from 'styles/NavLink';
import ContentContainer from 'styles/ContentContainer';
// assets
import LogoSVG from 'assets/logo-pattern.svg';

// component styles
const Styled = styled.header`
  height: 100px;
  text-align: center;
  @media (min-width: ${(props) => props.theme.breakpoints[BREAKPOINTS.MEDIUM]}) {
    height: 70px;
  }
  @media print {
    height: 70px;
  }
`;
const Brand = styled(NavLink)`
  box-shadow: none;
  min-width: 0;
  max-width: 130px;
  padding: 5px 10px;
  margin: 0;
  position: absolute;
  left: 100px;
  top: 7px;
  @media (min-width: ${(props) => props.theme.breakpoints[BREAKPOINTS.SMALL]}) {
    left: 95px;
    max-width: none;
    padding: 5px 20px;
    margin: 0 5px;
  }
  @media (min-width: ${(props) => props.theme.breakpoints[BREAKPOINTS.MEDIUM]}) {
    top: 17px;
    left: -25px;
  }
  @media print {
    top: 17px;
    left: -25px;
  }
  &:hover{
    box-shadow: none !important;
    color: ${(props) => props.theme.colors.hover};
    background-color: ${(props) => props.theme.colors.white};
  }
  &:focus{
    box-shadow: none !important;
    color: ${(props) => props.theme.colors.hover};
    background-color: ${(props) => props.theme.colors.white};
  }
  &:active{
    color: ${(props) => props.theme.colors.hover};
    background-color: ${(props) => props.theme.colors.white};
  }
  &:hover:focus{
    background-color: ${(props) => props.theme.colors.white};
  }
`;
const LogoWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
`;

const Logo = styled(LogoSVG)`
  height: 50px;
  @media (min-width: ${(props) => props.theme.breakpoints[BREAKPOINTS.MEDIUM]}) {
    height: 70px;
  }
  @media print {
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
  @media print {
    height: 70px;
  }
`;
const AboutLink = styled(NavLink)`
  position: absolute;
  top: 16px;
  right: 5px;
  box-shadow: none;
  min-width: 0;
  ${(props) => props.active && css`
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.2);
  `}
  @media (min-width: ${(props) => props.theme.breakpoints[BREAKPOINTS.SMALL]}) {
    top: 10px;
    right: 0;
  }
  @media (min-width: ${(props) => props.theme.breakpoints[BREAKPOINTS.MEDIUM]}) {
    top: 20px;
  }
  @media print {
    display: none;
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
      <LogoWrapper>
        <Logo role="presentation" aria-hidden="true" />
      </LogoWrapper>
      <ContentContainer>
        <Brand
          onClick={() => nav('')}
          title={`${getLabel('app.title')}. ${getLabel('screenreader.header.homeLink')}`}
          aria-label={`${getLabel('app.title')}. ${getLabel('screenreader.header.homeLink')}`}
        >
          <Icon name="brand" title={getLabel('app.title')} />
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
      </ContentContainer>
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
