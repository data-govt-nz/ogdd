import PropTypes from 'prop-types';

import labels from 'labels/labels.json';

const Label = ({ id }) => labels[id] || labels['error.label-undefined'];

Label.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Label;
