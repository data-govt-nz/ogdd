// vendor
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// utils
import setLinkTarget from 'utils/set-link-target';
// app constants
import { BREAKPOINTS } from 'containers/App/constants';
// components
import HTMLWrapper from 'components/HTMLWrapper';

// component styles
const Styled = styled.div`
  @media (min-width: ${(props) => props.theme.breakpoints[BREAKPOINTS.SMALL]}) {
    padding: 4px 5px 10px;
    margin-bottom: 50px;
    margin-top: ${(props) => props.isOffset ? 26 : 0}px;
  }
  @media (min-width: ${(props) => props.theme.breakpoints[BREAKPOINTS.MEDIUM]}) {
    padding: 4px 15px 10px;
    margin-top: ${(props) => props.isOffset ? 25 : 0}px;
  }
  @media print {
    padding: 4px 0 10px;
    margin-top: 20px;
    margin-bottom: 50px;
  }
`;

/**
  * Sidebar content. Requires a title component or string. Can optionally be passed
  * - plain text
  * - html (eg as parsed form markdown text)
  * - child components
  *
  * @return {Component} AsideContent
  */
const AsideContent = ({ title, html, text, children, isOffset }) => (
  <Styled isOffset={isOffset}>
    { title }
    { html &&
      <HTMLWrapper printURL innerhtml={setLinkTarget(html)} />
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
  /** optionally allow to vertically offset component for alignment purposes */
  isOffset: PropTypes.bool,
};

export default AsideContent;
