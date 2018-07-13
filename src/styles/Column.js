import React from 'react';
import { Box } from 'grid-styled';
import styled from 'styled-components';

const Column = styled(Box)`
  padding: 0 ${(props) => props.theme.gutter[0]}
  @media (min-width: ${(props) => props.theme.breakpoints[0]}) {
    padding: 0 ${(props) => props.theme.gutter[1]};
  }
  @media (min-width: ${(props) => props.theme.breakpoints[1]}) {
    padding: 0 ${(props) => props.theme.gutter[2]};
  }
`;

export default (props) => (
  <Column
    {...props}
    flex="0 0 auto"
  />
);
