/**
  * @ignore
  * Global application styles, including normalize.css for styled components
  *
  */

import styledNormalize from 'styled-normalize';
import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  ${styledNormalize};

  @import url('https://fonts.googleapis.com/css?family=Barlow:400,500,600,700');
  #ogdd-root {
    font-family: 'Barlow', sans-serif;
    font-size: 14px;
    color: #202326;
    font-weight: 400;
    line-height: 1.15;
    -webkit-font-smoothing: antialiased;
  }
  #ogdd-root p {
    font-family: 'Barlow', sans-serif;
    line-height: 1.4;
  }
  #ogdd-root h1,
  #ogdd-root h2,
  #ogdd-root h3,
  #ogdd-root h4,
  #ogdd-root h5,
  #ogdd-root header,
  #ogdd-root footer,
  #ogdd-root section,
  #ogdd-root article,
  #ogdd-root ul,
  #ogdd-root aside {
    font-family: 'Barlow', sans-serif;
    line-height: 1.15;
  }
  #ogdd-root header,
  #ogdd-root footer,
  #ogdd-root section,
  #ogdd-root article,
  #ogdd-root ul,
  #ogdd-root aside,
  #ogdd-root label {
    margin-bottom: 0;
  }
  #ogdd-root label {
    display: inline;
  }
  #ogdd-root a {
    text-decoration: underline;
    border-bottom: none;
    color: #202326;
    &:hover{
      text-decoration: underline;
      color: #2956D1;
      border-bottom: none;
    }
    &:focus{
      outline: 0;
      color: #2956D1;
      outline: none;
      box-shadow: none;
      border-radius: 0;
    }
  }
  #ogdd-root select {
    width: auto;
    height: auto;
    margin-bottom: 0;
    display: inline;
    padding: 0;
    border: 0;
    background-color: transparent;
    color: #202326;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    border-radius: 0;
    cursor: pointer;
    &:focus {
      font-size: 14px !important;
      box-shadow: none;
    }
  }
  #ogdd-root ::selection {
    color: #fff;
    background-color: #2956D1; /* WebKit/Blink Browsers */
  }
  #ogdd-root ::-moz-selection {
    color: #fff;
    background-color: #2956D1; /* Gecko Browsers */
  }

  #ogdd-root .rv-xy-plot {
    color: #202326;
    font-weight: 600;
  }
  #ogdd-root .rv-xy-plot__axis__line {
    stroke-width: 1px;
    stroke: #E7E9EB;
  }
  #ogdd-root .rv-xy-plot__axis__tick__line {
    stroke: #E7E9EB;
  }
  #ogdd-root .rv-xy-plot__grid-lines__line {
    stroke: #E7E9EB;
  }
  #ogdd-root .rv-xy-plot__axis__tick__text {
    fill: #202326;
  }
  #ogdd-root .rv-xy-plot__axis__tick__text::selection {
    fill: #fff;
  }
  #ogdd-root .rv-xy-plot__axis__tick__text::-moz-selection {
    fill: #fff;
  }
`;
// 'a' same as styles/Link
