/**
  * Key item component with icon - used for focus areas in insights sidebar
  * Icons are placed inside colored dot
  * @return {Component} Key entry with icon
  * @author [tmfrnz](https://github.com/tmfrnz)
  */
// vendor
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// component styles
const Styled = styled.div`
  display: table;
  table-layout: fixed;
  width: 100%;
  line-height: 20px;
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
  background-color: ${(props) => props.color ? props.theme.colors[props.color] : props.theme.colors.black};
  text-align: center;
`;
const Icon = styled.img`
  position: relative;
  height: 24px;
  width: 24px;
  top: 5px;
`;

const KeyEntryIcon = ({ color, title, iconSrc }) => (
  <Styled>
    <DotCell>
      <Dot color={color} >
        <Icon alt="" src={iconSrc} role="presentation" />
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
  iconSrc: PropTypes.string.isRequired,
};

export default KeyEntryIcon;
