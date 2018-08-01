import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Label from 'components/Label';

const Styled = styled.div``;

const Select = styled.select`
  text-decoration: underline;
  @media (min-width: ${(props) => props.theme.breakpoints[1]}) {
    text-decoration: none;
  }
`;

/* eslint-disable react/no-danger */
const SelectWrapper = ({ labelID, value, options, onChange, valueKey, formatOption }) => (
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
  </Styled>
);
/* eslint-enable react/no-danger */

SelectWrapper.propTypes = {
  labelID: PropTypes.string,
  value: PropTypes.string,
  options: PropTypes.object,
  onChange: PropTypes.func,
  formatOption: PropTypes.func,
  valueKey: PropTypes.string,
};

export default SelectWrapper;
