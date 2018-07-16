import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Label from 'components/Label';

import { BREAKPOINTS } from 'containers/App/constants';
import Menu from 'containers/Menu';


import getLabel from 'utils/get-label';

import reactLogo from 'assets/React-icon.png';

const Styled = styled.header`
  height: 100px;
  text-align: center;
  @media (min-width: ${(props) => props.theme.breakpoints[BREAKPOINTS.MEDIUM]}) {
    height: 70px;
  }
`;

const Brand = styled.div`
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

const Title = styled.div`
  display: inline-block;
  text-transform: uppercase;
  font-weight: bold;
  vertical-align: middle;
  font-size: 0.8em;
  width: 140px;
  @media (min-width: ${(props) => props.theme.breakpoints[BREAKPOINTS.MEDIUM]}) {
    font-size: 1em;
    width: 170px;
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

const Header = ({ navItems }) => (
  <Styled role="banner">
    <NavBar>
      <Brand>
        <Logo alt={getLabel('app.title')} src={reactLogo} role="presentation" />
        <Title>
          <Label id="app.title" />
        </Title>
      </Brand>
      <Menu navItems={navItems} visibleMin={BREAKPOINTS.MEDIUM} />
    </NavBar>
    <Menu navItems={navItems} hiddenMin={BREAKPOINTS.MEDIUM} />
  </Styled>
);

Header.propTypes = {
  navItems: PropTypes.array,
};

export default Header;
