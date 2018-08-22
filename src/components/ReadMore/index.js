// vendor
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// components
import Label from 'components/Label';
// styles
import Link from 'styles/Link';

// component styles
const Styled = styled(Link)`
  height: 50px;
  font-size: 13px !important;
`;

/**
  * Read more link
  *
  * @return {Component} Read more link
  */
const ReadMore = ({ onClick }) => (
  <Styled onClick={onClick}>
    <Label id="button.readMore" />
  </Styled>
);

ReadMore.propTypes = {
  /** click handler */
  onClick: PropTypes.func.isRequired,
};

export default ReadMore;
