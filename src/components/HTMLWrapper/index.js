import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const Styled = styled.div`
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
  * Wrap HTML text, allow printing link URLs
  */
const HTMLWrapper = ({ printURL, innerhtml }) =>
/* eslint-disable react/no-danger */
// required for setting inner HTML (from markdown content)
(
  <Styled
    printURL={printURL}
    className="ogdd-html"
    dangerouslySetInnerHTML={{ __html: innerhtml }}
  />
);
/* eslint-enable react/no-danger */

HTMLWrapper.propTypes = {
  printURL: PropTypes.bool,
  innerhtml: PropTypes.string,
};

export default HTMLWrapper;
