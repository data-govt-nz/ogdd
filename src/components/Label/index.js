import PropTypes from 'prop-types';

import getLabel from 'utils/get-label';

const Label = ({ id }) => getLabel(id);

Label.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Label;
