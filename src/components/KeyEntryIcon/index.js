// vendor
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from 'components/Icon';

// component styles
const Styled = styled.div`
  display: table;
  table-layout: fixed;
  width: 100%;
  line-height: 16px;
  margin-bottom: 6px;
`;
const Cell = styled.div`
  display: table-cell;
  vertical-align: middle;
  font-size: ${(props) => props.theme.sizes[1]};
`;
const DotCell = styled(Cell)`
  width: 42px;
  padding: 4px;
`;
const Dot = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 9999px;
  background-color: ${(props) => props.color ? props.theme.colors[props.color] : props.theme.colors.black} !important;
  text-align: center;
  padding: 5px;
  @media print {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
`;

/**
  * Key item component with icon - used for focus areas in insights sidebar
  * Icons are placed inside colored dot
  *
  * @return {Component} Key entry with icon
  *
  */
const KeyEntryIcon = ({ color, title, icon }) => (
  <Styled>
    <DotCell>
      <Dot color={color} >
        <Icon name={icon} themeColor="white" size={24} />
      </Dot>
    </DotCell>
    <Cell>
      { title }
    </Cell>
  </Styled>
);

KeyEntryIcon.propTypes = {
  /** the circle color, defaults to 'black' */
  color: PropTypes.string,
  /** the key label as displayed */
  title: PropTypes.string.isRequired,
  /** the icon source */
  icon: PropTypes.string.isRequired,
};

export default KeyEntryIcon;
