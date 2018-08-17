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

  @import url('https://fonts.googleapis.com/css?family=Barlow:300,400,600,700');
  #ogdd-root {
    font-family: 'Barlow', sans-serif;
    font-size: 14px;
    color: #202326;
  }
  #ogdd-root a {
    text-decoration: underline;
    color: #202326;
    &:hover{
      color: #2956D1;
    }
    &:focus{
      outline: 0;
      color: #2956D1;
    }
  }
`;
// 'a' same as styles/Link
