import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import { Map } from 'immutable';

import { navigate } from 'containers/App/actions';
import { selectLocation } from 'containers/App/selectors';
import { BREAKPOINTS } from 'containers/App/constants';
import Menu from 'containers/Menu';

import Label from 'components/Label';
import ScreenReaderOnly from 'styles/ScreenReaderOnly';
import Button from 'styles/Button';
import NavLink from 'styles/NavLink';

import getLabel from 'utils/get-label';

import logo from 'assets/logo.svg';

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

// const Title = styled.div`
//   display: inline-block;
//   text-transform: uppercase;
//   font-weight: bold;
//   vertical-align: middle;
//   font-size: 0.8em;
//   width: 140px;
//   @media (min-width: ${(props) => props.theme.breakpoints[BREAKPOINTS.MEDIUM]}) {
//     font-size: 1em;
//     width: 170px;
//   }
// `;

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
  navItems: PropTypes.array,
  nav: PropTypes.func.isRequired,
  location: PropTypes.instanceOf(Map),
};
const mapStateToProps = (state) => ({
  location: selectLocation(state),
});

const mapDispatchToProps = (dispatch) => ({
  // navigate to location
  nav: (location, args) => {
    dispatch(navigate(location, args));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
