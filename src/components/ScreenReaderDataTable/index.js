/**
  * Screen reader fallback data table for data visualisations
  *
  * @return {Component} Screen reader table fallback
  * @author [tmfrnz](https://github.com/tmfrnz)
  */

// vendor
import React from 'react';
import PropTypes from 'prop-types';
// styles
import ScreenReaderOnly from 'styles/ScreenReaderOnly';

const ScreenReaderDataTable = ({ data, caption, rows, columns, formatDatum }) => (
  <ScreenReaderOnly>
    <table>
      <caption>
        { caption }
      </caption>
      <thead>
        <tr>
          <td />
          {columns.map((c) => <th scope="col" key={c.id}>{c.label}</th>)}
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.id}>
            <th scope="row">{r.label}</th>
            {columns.map((c) => {
              const datum = data.find((d) => d.column === c.id && d.row === r.id);
              return <td key={c.id}>{datum ? formatDatum(datum) : ''}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  </ScreenReaderOnly>
);

ScreenReaderDataTable.propTypes = {
  /** list of values for each row and column */
  data: PropTypes.array.isRequired,
  /** list of columns with column headers */
  columns: PropTypes.array.isRequired,
  /** list of rows with row headers */
  rows: PropTypes.array.isRequired,
  /** table caption */
  caption: PropTypes.string.isRequired,
  /** value formatterv */
  formatDatum: PropTypes.func.isRequired,
};

export default ScreenReaderDataTable;
