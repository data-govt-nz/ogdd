/**
  * Page title with icon as used in sidebar
  * Requires either title as displayed or label id
  *
  * @return {Component} Page title with icon
  * @author [tmfrnz](https://github.com/tmfrnz)
  */
// vendor
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// components
import Label from 'components/Label';

// component styles
const Styled = styled.div`
  display: table;
  table-layout: fixed;
  width: 100%;
  line-height: 20px;
  height: 40px;
`;
const Cell = styled.div`
  display: table-cell;
  vertical-align: top;
  font-size: 15px;
  font-weight: bold;
  text-transform: uppercase;
  padding-top: 3px;
  @media (min-width: ${(props) => props.theme.breakpoints[0]}) {
    padding-top: 8px;
  }
`;
const IconCell = styled.div`
  display: table-cell;
  vertical-align: top;
  width: 28px;
  @media (min-width: ${(props) => props.theme.breakpoints[0]}) {
    width: 42px;
  }
`;
const Icon = styled.img`
  position: relative;
  left: 0;
  height: 24px;
  width: 24px;
  @media (min-width: ${(props) => props.theme.breakpoints[0]}) {
    height: 38px;
    width: 38px;
  }
`;

const PageTitle = ({ labelId, iconSrc, title }) => (
  <Styled>
    <IconCell>
      <Icon alt="" src={iconSrc} role="presentation" />
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
  /** icon source */
  iconSrc: PropTypes.string,
};

export default PageTitle;
