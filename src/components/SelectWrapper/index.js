// vendor
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { List } from 'immutable';
// components
import Label from 'components/Label';
import SelectedSingle from 'styles/SelectedSingle';
import PrintOnly from 'styles/PrintOnly';

// component styles
const Styled = styled.div``;
const SelectDiv = styled.span`
  border-bottom: 1px solid;
  margin: 0 2px;
  cursor: pointer;
  position: relative;
  &:hover {
    color: ${(props) => props.theme.colors.hover};
  }
  &:before {
    content: '';
    display: inline-block;
    width: 0px;
    height: 0px;
    margin-left: 0.255em;
    vertical-align: 0.255em;
    border-top: 0.3em solid;
    border-right: 0.3em solid transparent;
    border-bottom: 0px;
    border-left: 0.3em solid transparent;
    position: absolute;
    top: 7px;
    right: 0;
    z-index: 1;
  }
`;
const Select = styled.select`
  font-weight: 700;
  padding-right: 10px !important;
  position: relative;
  z-index: 2;
  bottom: -1px;
  @media print {
    display: none;
  }
  &:hover {
    color: ${(props) => props.theme.colors.hover} !important;
  }
  &:focus {
    color: ${(props) => props.theme.colors.hover} !important;
    outline: none !important;
    &:-ms-value {
      background-color: $input-bg;
      color: $input-color;
    }
  }
  &:-moz-focus-inner {
    outline: none !important;
  }
  &:-moz-focusring {
    color: transparent;
    text-shadow: 0 0 0 #000;
  }
`;

const Option = styled.option`
  &:not(:checked) {
    color: ${(props) => props.theme.colors.black}; /* prevent <option>s from becoming transparent as well */
  }
`;

// text-decoration: none;
/**
  * Wrapper for plot select options
  *
  * @return {Component} Select Wrapper component
  *
  */
const SelectWrapper = ({ labelID, value, title, options, onChange, valueKey, formatOption }) => (
  <Styled>
    <label htmlFor="ogdd-plot-option-select" >
      <Label id={labelID} />
    </label>
    <SelectDiv>
      <Select
        id="ogdd-plot-option-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        { options.map((item) => (
          <Option key={item.get(valueKey)} value={item.get(valueKey)} >
            { formatOption(item) }
          </Option>
        ))}
      </Select>
    </SelectDiv>
    <PrintOnly>
      <SelectedSingle>{ title }</SelectedSingle>
    </PrintOnly>
  </Styled>
);

SelectWrapper.propTypes = {
  /** select label id */
  labelID: PropTypes.string,
  /** current value */
  value: PropTypes.string,
  /** current title */
  title: PropTypes.string,
  /** select options list */
  options: PropTypes.instanceOf(List),
  /** on select change handler */
  onChange: PropTypes.func,
  /** option formatter */
  formatOption: PropTypes.func,
  /** key to select value from option */
  valueKey: PropTypes.string,
};

export default SelectWrapper;
