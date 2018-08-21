// vendor
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Icon from 'components/Icon';
import { BREAKPOINTS } from 'containers/App/constants';

// component styles
const Styled = styled.div`
  display: table;
  table-layout: fixed;
  width: 100%;
  line-height: 20px;
`;
const Cell = styled.div`
  display: table-cell;
  vertical-align: top;
  padding-top: 10px;
  font-size: 15px;
  font-weight: 500;
`;

const IconCell = styled.div`
  display: table-cell;
  vertical-align: top;
  width: 38px;
  @media (min-width: ${(props) => props.theme.breakpoints[BREAKPOINTS.SMALL]}) {
    width: 38px;
  }
`;

const IconWrap = styled.div`
  position: relative;
  left: -3px;
  @media (min-width: ${(props) => props.theme.breakpoints[BREAKPOINTS.SMALL]}) {
    left: -3px;
  }
`;

/**
  * Card title component to display card titles with icon or icon only
  *
  * @return {Component} Card title
  *
  */
const CardTitle = ({ title, icon, altTitle }) => (
  <Styled>
    <IconCell>
      <IconWrap>
        <Icon name={icon} title={altTitle} themeColor={icon} />
      </IconWrap>
    </IconCell>
    <Cell>
      { title }
    </Cell>
  </Styled>
);

CardTitle.propTypes = {
  /** the optional card title */
  title: PropTypes.string,
  /** the optional alt attribute title - should be provided if title ommitted */
  altTitle: PropTypes.string,
  icon: PropTypes.node,
};

CardTitle.defaultProps = {
  title: '',
};

export default CardTitle;
