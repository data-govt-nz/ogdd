// vendor
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import { Map } from 'immutable';
// utils
import getLabel from 'utils/get-label';
// components
import Label from 'components/Label';
// containers
import { navigate } from 'containers/App/actions';
import { selectLocation } from 'containers/App/selectors';
import { BREAKPOINTS } from 'containers/App/constants';
// simple styles
import ScreenReaderOnly from 'styles/ScreenReaderOnly';
import NavLink from 'styles/NavLink';

// component styles
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
  @media print {
    display: none;
  }
`;
const Link = styled(NavLink)``;

/**
  * The main header menu for navigating between principal application components
  *
  *
  */
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
  /** Navigation action */
  nav: PropTypes.func.isRequired,
  /** Array of navigation item objects */
  navItems: PropTypes.array,
  /** the current location as selected from store */
  location: PropTypes.instanceOf(Map),
  /** the minimum breakpoint index for menu to be visible */
  visibleMin: PropTypes.number,
  /** the minimum breakpoint index for menu to be hidden */
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
