/**
  * Wrapper component for getLabel function
  *
  * @return {string} a label
  * @author [tmfrnz](https://github.com/tmfrnz)
  */
// vendor
import PropTypes from 'prop-types';
// utils
import getLabel from 'utils/get-label';

const Label = ({ id }) => getLabel(id) ? getLabel(id) : getLabel('labelNotFound');

Label.propTypes = {
  /** the label id */
  id: PropTypes.string.isRequired,
};

export default Label;
