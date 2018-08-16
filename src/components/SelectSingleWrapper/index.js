// vendor
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// components
import Label from 'components/Label';
import SelectedSingle from 'styles/SelectedSingle';

// component styles
const Styled = styled.div``;

/**
  * Wrapper for plot select options when only one option present (not actually a select component)
  *
  * @return {Component} Select Wrapper component for ingle option
  *
  */
const SelectSingleWrapper = ({ labelID, title }) => (
  <Styled>
    <label htmlFor="ogdd-plot-option-select" >
      <Label id={labelID} />
    </label>
    <SelectedSingle>{ title }</SelectedSingle>
  </Styled>
);

SelectSingleWrapper.propTypes = {
  /** select label id */
  labelID: PropTypes.string,
  /** current title */
  title: PropTypes.string,
};

export default SelectSingleWrapper;
