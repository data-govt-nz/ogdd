import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';

import { navigate } from 'containers/App/actions';
import { selectLocation } from 'containers/App/selectors';
import { BREAKPOINTS } from 'containers/App/constants';
import Menu from 'containers/Menu';

import Label from 'components/Label';
import ScreenReaderOnly from 'styles/ScreenReaderOnly';

import getLabel from 'utils/get-label';

import logo from 'assets/logo.svg';

const Styled = styled.header`
  height: 100px;
  text-align: center;
  @media (min-width: ${(props) => props.theme.breakpoints[BREAKPOINTS.MEDIUM]}) {
    height: 70px;
  }
`;

const Brand = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  text-align: left;
  border: 0;
  margin: 0;
  padding: 0;
  cursor: pointer;
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

const AboutLink = styled.button`
  cursor: pointer;
  position: absolute;
  padding: 3px 10px;
  top: 10px;
  right: 30px;
  text-align: center;
  border: 0;
  border-radius: 99999px;
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.2);
  font-size: 0.8em;
  ${(props) => props.active && css`
    color: ${props.theme.colors.white};
    background-color: ${props.theme.colors.black};
  `}
  @media (min-width: ${(props) => props.theme.breakpoints[BREAKPOINTS.SMALL]}) {
    padding: 7px 20px;
    right: 50px;
    font-size: 0.9em;
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
  location: PropTypes.object,
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
