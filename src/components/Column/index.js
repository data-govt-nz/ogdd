// vendor
import React from 'react';
import { Box } from 'grid-styled';
import styled from 'styled-components';

// styles
const Column = styled(Box)`
  padding-top:${(props) => props.paddingtop || 0}px;
  padding-right:${(props) => props.theme.gutter[0]};
  padding-left:${(props) => props.theme.gutter[0]};
  padding-bottom: 0;
  @media (min-width: ${(props) => props.theme.breakpoints[0]}) {
    padding-right:${(props) => props.theme.gutter[1]};
    padding-left:${(props) => props.theme.gutter[1]};
  }
  @media (min-width: ${(props) => props.theme.breakpoints[1]}) {
    padding-right:${(props) => props.theme.gutter[2]}
    padding-left:${(props) => props.theme.gutter[2]}
  }
  position: relative;
`;


/**
  * Column for grid. Use inside styles/Row
  *
  */
export default (props) => (
  <Column
    {...props}
    flex="0 0 auto"
  />
);
