import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const Styled = styled.div`
  ${(props) => props.large && css`
    font-size: 16px;
  `};
  ${(props) => props.printURL && css`
    @media print{
      a:after{
        content:" (" attr(href) ") ";
        font-size: 0.8em;
        font-weight: 400;
      }
    }
    `
  }
`;

/**
  * Wrap HTML text:
  * - sets global class 'ogdd-html' to allow specifically targeting html markup
  * - allow spelling out URLs in print mode
  *
  * @return {Component} HTMLWrapper
  */
const HTMLWrapper = ({ printURL, innerhtml, large }) =>
/* eslint-disable react/no-danger */
// required for setting inner HTML (from markdown content)
(
  <Styled
    printURL={printURL}
    large={large}
    className="ogdd-html"
    dangerouslySetInnerHTML={{ __html: innerhtml }}
  />
);
/* eslint-enable react/no-danger */

HTMLWrapper.propTypes = {
  /* the inner HTML text */
  innerhtml: PropTypes.string.isRequired,
  /* if URLs should be spelled out in print mode */
  printURL: PropTypes.bool,
  /* if URLs should be spelled out in print mode */
  large: PropTypes.bool,
};

export default HTMLWrapper;
