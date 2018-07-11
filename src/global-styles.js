import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Barlow:300,400,600,700');
  body {
    margin: 0;
    height: 100%;
    width: 100%;
  }
  #root {
    font-family: 'Barlow', sans-serif;
  }
`;
