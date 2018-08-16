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
const Select = styled.select`
  text-decoration: underline;
  @media (min-width: ${(props) => props.theme.breakpoints[1]}) {
    text-decoration: none;
  }
  @media print {
    display: none;
  }
`;

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
    <Select
      id="ogdd-plot-option-select"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      { options.map((item) => (
        <option key={item.get(valueKey)} value={item.get(valueKey)} >
          { formatOption(item) }
        </option>
      ))}
    </Select>
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
