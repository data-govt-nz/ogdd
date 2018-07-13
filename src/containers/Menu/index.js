import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';

import Label from 'components/Label';
import ScreenReaderOnly from 'styles/ScreenReaderOnly';

import { navigate } from 'containers/App/actions';
import { selectLocation } from 'containers/App/selectors';

import getLabel from 'utils/get-label';

const Styled = styled.nav`
  display: inline-block;
`;
const Link = styled.button`
  display: inline-block;
  padding: 0 1em;

  ${(props) => props.active && css`
    font-weight: bold;
  `}
`;

const Menu = ({ nav, navItems, location }) => (
  <Styled role="menu">
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
  </Styled>
);

Menu.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
