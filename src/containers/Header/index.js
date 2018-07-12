import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';

import Label from 'components/Label';
import ScreenReaderOnly from 'styles/ScreenReaderOnly';

import { navigate } from 'containers/App/actions';
import { selectLocation } from 'containers/App/selectors';

import getLabel from 'utils/get-label';

import reactLogo from 'assets/React-icon.png';

const Component = styled.header`
  height: 80px;
  background: grey;
`;
const Logo = styled.img`
  height: 80px;
  display: inline-block;
`;
const Title = styled.div`
  display: inline-block;
`;
const Menu = styled.nav`
  display: inline-block;
`;
const Link = styled.button`
  display: inline-block;
  padding: 0 1em;

  ${(props) => props.active && css`
    font-weight: bold;
  `}
`;

const Header = ({ nav, navItems, location }) => (
  <Component>
    <Logo alt={getLabel('app.title')} src={reactLogo} role="presentation" />
    <Title>
      <h1><Label id="app.title" /></h1>
    </Title>
    <Menu role="menu">
      {
        navItems.map((item) => (
          <Link
            role="menuitem"
            key={item.path}
            active={location.path === item.path}
            onClick={() => nav(item.path)}
            title={getLabel(item.label)}
          >
            <Label id={item.label} />
            { location.path === item.path &&
              <ScreenReaderOnly id="currentItem">
                <Label id="screenreader.navActive" />
              </ScreenReaderOnly>
            }
          </Link>
        ))
      }
    </Menu>

  </Component>
);

Header.propTypes = {
  nav: PropTypes.func.isRequired,
  navItems: PropTypes.array,
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
