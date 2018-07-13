import styled from 'styled-components';
import { Box } from 'grid-styled';

export default styled(Box)`
  max-width: 1024px;
  overflow-x: hidden;
  margin: 0 auto;
  @media (min-width: ${(props) => props.theme.breakpoints[0]}) {
    padding: 0 ${(props) => props.theme.gutter[1]};
    overflow-x: visible;
  }
  @media (min-width: ${(props) => props.theme.breakpoints[1]}) {
    padding: 0 ${(props) => props.theme.gutter[2]};
  }
`;
