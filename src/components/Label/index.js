// vendor
import React from 'react';
import PropTypes from 'prop-types';
// utils
import getLabel from 'utils/get-label';

/**
  * Wrapper component for getLabel function
  *
  * @return {string} a label
  *
  */
const Label = ({ id }) => (
  <React.Fragment>
    {getLabel(id) ? getLabel(id) : getLabel('labelNotFound')}
  </React.Fragment>
);

Label.propTypes = {
  /** the label id */
  id: PropTypes.string.isRequired,
};

export default Label;
