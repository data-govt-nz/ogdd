/**
  * Description
  *
  * @author [tmfrnz](https://github.com/tmfrnz)
  */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ScreenReaderDataTable from 'components/ScreenReaderDataTable';
import ScreenReaderOnly from 'styles/ScreenReaderOnly';

const ScreenReaderCaption = ScreenReaderOnly.withComponent('figcaption');

const Styled = styled.figure`
  margin: 0;
`;

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
  figCaption: PropTypes.string.isRequired,
  tableCaption: PropTypes.string.isRequired,
  tableData: PropTypes.object.isRequired,
  formatValue: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default ScreenReaderWrapPlot;
