import React from 'react';
import PropTypes from 'prop-types';

import ScreenReaderOnly from 'styles/ScreenReaderOnly';

const ScreenReaderDataTable = ({ data, caption, rows, columns }) => {
  console.log(rows, columns, data)
  return (
    <ScreenReaderOnly>
      <table>
        <caption>
          { caption }
        </caption>
        <tbody>
          <tr>
            <td />
            <th>
            </th>
          </tr>
        </tbody>
      </table>
    </ScreenReaderOnly>
  );
};

ScreenReaderDataTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  caption: PropTypes.string.isRequired,
};

export default ScreenReaderDataTable;
