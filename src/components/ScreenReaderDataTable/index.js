import React from 'react';
import PropTypes from 'prop-types';

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
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  caption: PropTypes.string.isRequired,
  formatDatum: PropTypes.func.isRequired,
};

export default ScreenReaderDataTable;
