// vendor
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// utils
import setLinkTarget from 'utils/set-link-target';

// component styles
const Styled = styled.div`
  padding: 10px;
`;

/**
  * Sidebar content. Requires a title component or string. Can optionally be passed
  * - plain text
  * - html (eg as parsed form markdown text)
  * - child components
  *
  *
  */
const AsideContent = ({ title, html, text, children }) => (
  <Styled>
    { title }
    { html &&
      /* eslint-disable react/no-danger */
      <div dangerouslySetInnerHTML={{ __html: setLinkTarget(html) }} />
      /* eslint-enable react/no-danger */
    }
    { text &&
      <p>{text}</p>
    }
    { children }
  </Styled>
);

AsideContent.propTypes = {
  /** title component or text */
  title: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,
  /** optional html content */
  html: PropTypes.string,
  /** optional text content */
  text: PropTypes.string,
  /** optional content as components */
  children: PropTypes.node,
};

export default AsideContent;
