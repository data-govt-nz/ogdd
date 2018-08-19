import React from 'react';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';
import { withTheme } from 'styled-components';

import Label from 'components/Label'

const Loading = ({ theme }) => (
  <div>
    <Label id="app.loading" />
    <ReactLoading type="bubbles" color={theme.colors.hover} height={20} width={60} />
  </div>
);

Loading.propTypes = {
  /** global theme */
  theme: PropTypes.object.isRequired,
};

export default withTheme(Loading);
