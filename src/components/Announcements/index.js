import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const VisuallyHidden = styled.div`

`;

const Announcements = ({ message }) => (
  <VisuallyHidden
    aria-live="polite"
    aria-atomic="true"
    role="status"
    aria-relevant="additions"
  >
    { message }
  </VisuallyHidden>
);

Announcements.propTypes = {
  message: PropTypes.string,
};

export default Announcements;
