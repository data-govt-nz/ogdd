import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Label from 'components/Label';
import Link from 'styles/Link';

const Styled = styled(Link)``;

const ReadMore = ({ onClick }) => (
  <Styled onClick={onClick}>
    <Label id="button.readMore" />
  </Styled>
);

ReadMore.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ReadMore;
