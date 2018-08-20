// vendor
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// components
import Label from 'components/Label';
import Icon from 'components/Icon';

// component styles
const Styled = styled.div`
  display: table;
  table-layout: fixed;
  width: 100%;
  line-height: 20px;
  height: 50px;
  @media (min-width: ${(props) => props.theme.breakpoints[0]}) {
    height: 40px;
  }
`;
const Cell = styled.div`
  display: table-cell;
  vertical-align: middle;
  font-size: 15px;
  font-weight: bold;
  text-transform: uppercase;
  @media (min-width: ${(props) => props.theme.breakpoints[0]}) {
    vertical-align: top;
    padding-top: 10px;
  }
`;
const IconCell = styled.div`
  display: table-cell;
  vertical-align: middle;
  width: 28px;
  @media (min-width: ${(props) => props.theme.breakpoints[0]}) {
    vertical-align: top;
    width: 40px;
  }
`;
const IconWrap = styled.div`
  position: relative;
  left: -2px;
  padding-right: 4px;
  @media (min-width: ${(props) => props.theme.breakpoints[0]}) {
    padding-right: 2px;
    left: -5px;
  }
`;

/**
  * Page title with icon as used in sidebar
  * Requires either title as displayed or label id
  *
  * @return {Component} Page title with icon
  *
  */
const PageTitle = ({ labelId, icon, title }) => (
  <Styled>
    <IconCell>
      <IconWrap>
        <Icon name={icon} />
      </IconWrap>
    </IconCell>
    <Cell>
      { title &&
        <span>{title}</span>
      }
      { labelId &&
        <Label id={labelId} />
      }
    </Cell>
  </Styled>
);

PageTitle.propTypes = {
  /** title as displayed */
  title: PropTypes.string,
  /** title by label id */
  labelId: PropTypes.string,
  /** icon id */
  icon: PropTypes.string,
};

export default PageTitle;
