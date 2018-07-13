import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Label from 'components/Label';
import Hidden from 'styles/Hidden';
import Visible from 'styles/Visible';

import Menu from 'containers/Menu';

import getLabel from 'utils/get-label';

import reactLogo from 'assets/React-icon.png';

const Component = styled.header`
  height: 40px;
`;
const Logo = styled.img`
  height: 40px;
  display: inline-block;
`;
const Title = styled.div`
  display: inline-block;
`;

const NavBar = styled.div`
  box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.5);
`;

const Header = ({ navItems }) => (
  <Component role="banner">
    <NavBar>
      <Logo alt={getLabel('app.title')} src={reactLogo} role="presentation" />
      <Title>
        <h1><Label id="app.title" /></h1>
      </Title>
      <Visible min={1}>
        <Menu navItems={navItems} />
      </Visible>
    </NavBar>
    <Hidden min={1}>
      <Menu navItems={navItems} />
    </Hidden>
  </Component>
);

Header.propTypes = {
  navItems: PropTypes.array,
};

export default Header;
