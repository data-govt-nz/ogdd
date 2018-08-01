import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';

import Label from 'components/Label';
import ScreenReaderOnly from 'styles/ScreenReaderOnly';

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
const Link = styled.button`
  cursor: pointer;
  display: inline-block;
  padding: 3px 10px;
  margin: 0 2px;
  text-align: center;
  border-radius: 99999px;
  font-size: 0.8em;
  font-weight: 600;
  max-width: 75px;
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.2);
  border: 0;
  ${(props) => props.active && css`
    color: ${props.theme.colors.white};
    background-color: ${props.theme.colors.black};
  `}
  @media (min-width: ${(props) => props.theme.breakpoints[BREAKPOINTS.SMALL]}) {
    font-size: 0.9em;
    min-width: 100px;
    max-width: none;
    padding: 7px 20px;
    margin: 0 5px;
  }
`;

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
  location: PropTypes.object,
  visibleMin: PropTypes.number,
  hiddenMin: PropTypes.number,
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
