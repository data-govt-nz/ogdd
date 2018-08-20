// vendor
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// utils
import setLinkTarget from 'utils/set-link-target';
// styles
import HTMLWrapper from 'styles/HTMLWrapper';

// component styles
const Styled = styled.div`
  @media (min-width: ${(props) => props.theme.breakpoints[0]}) {
    padding: 4px 10px 10px;
    margin-bottom: 50px;
    margin-top: ${(props) => props.isOffset ? 26 : 0}px;
  }
  @media (min-width: ${(props) => props.theme.breakpoints[1]}) {
    padding: 4px 15px 10px;
    margin-top: ${(props) => props.isOffset ? 24 : 0}px;
  }
`;

/**
  * Sidebar content. Requires a title component or string. Can optionally be passed
  * - plain text
  * - html (eg as parsed form markdown text)
  * - child components
  *
  *
  */
const AsideContent = ({ title, html, text, children, isOffset }) => (
  <Styled isOffset={isOffset}>
    { title }
    { html &&
      /* eslint-disable react/no-danger */
      <HTMLWrapper printURL dangerouslySetInnerHTML={{ __html: setLinkTarget(html) }} />
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
  isOffset: PropTypes.bool,
};

export default AsideContent;
