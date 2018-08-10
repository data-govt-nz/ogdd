/**
  * Description
  *
  * @author [tmfrnz](https://github.com/tmfrnz)
  */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import { Map } from 'immutable';

import Label from 'components/Label';
import ScreenReaderOnly from 'styles/ScreenReaderOnly';
import NavLink from 'styles/NavLink';

import { navigate } from 'containers/App/actions';
import { selectLocation } from 'containers/App/selectors';
import { BREAKPOINTS } from 'containers/App/constants';

import getLabel from 'utils/get-label';

const Styled = styled.nav`
  display: inline-block;
  padding-top: 0.5em;

  ${(props) => props.visibleMin && css`
    display: none;
    @media (min-width: ${props.theme.breakpoints[props.visibleMin]}) {
      display: inline-block;
    }
  `}

  ${(props) => props.hiddenMin && css`
    @media (min-width: ${props.theme.breakpoints[props.hiddenMin]}) {
      display: none;
    }
  `}

  @media (min-width: ${(props) => props.theme.breakpoints[BREAKPOINTS.MEDIUM]}) {
    padding-top: 1.5em;
    margin-left: 120px;
  }
  @media (min-width: ${(props) => props.theme.breakpoints[BREAKPOINTS.LARGE]}) {
    margin-left: 0;
  }
`;
const Link = styled(NavLink)``;

const Menu = ({ nav, navItems, location, visibleMin, hiddenMin }) => (
  <Styled role="menu" visibleMin={visibleMin} hiddenMin={hiddenMin}>
    {
      navItems.map((item) => (
        <Link
          role="menuitem"
          key={item.path}
          active={location.get('path') === item.path
            || (item.activePaths && item.activePaths.indexOf(location.get('path')) > -1)
          }
          onClick={() => nav(item.path)}
          title={getLabel(item.label)}
        >
          <Label id={item.label} />
          { location.get('path') === item.path &&
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
  location: PropTypes.instanceOf(Map),
  visibleMin: PropTypes.number,
  hiddenMin: PropTypes.number,
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

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
