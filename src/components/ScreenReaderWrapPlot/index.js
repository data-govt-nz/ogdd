// vendor
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// components
import ScreenReaderDataTable from 'components/ScreenReaderDataTable';
// styles
import ScreenReaderOnly from 'styles/ScreenReaderOnly';

// component styles
const ScreenReaderCaption = ScreenReaderOnly.withComponent('figcaption');
const Styled = styled.figure`
  margin: 0;
`;

/**
  * Screen reader wrapper that provides a readable fallback data table for data visualisations
  *
  * @return {Component} Screen reader plot wrapper component
  *
  */
const ScreenReaderWrapPlot = ({
  figCaption,
  tableCaption,
  tableData,
  formatValue,
  children,
}) => (
  <Styled>
    <ScreenReaderCaption>{figCaption}</ScreenReaderCaption>
    <span aria-hidden="true" role="presentation">
      {children}
    </span>
    <ScreenReaderDataTable
      data={tableData.data}
      columns={tableData.columns}
      rows={tableData.rows}
      formatDatum={formatValue}
      caption={tableCaption}
    />
  </Styled>
);

ScreenReaderWrapPlot.propTypes = {
  /** the figure caption */
  figCaption: PropTypes.string.isRequired,
  /** the table caption */
  tableCaption: PropTypes.string.isRequired,
  /**
    * the data to be presented in table form
    * consists of data as well as row and column definitions
    */
  tableData: PropTypes.object.isRequired,
  /** value formatter */
  formatValue: PropTypes.func.isRequired,
  /** child components */
  children: PropTypes.node.isRequired,
};

export default ScreenReaderWrapPlot;
