import styled from 'styled-components';
import { Flex } from 'grid-styled';

/**
  * @component
  * Customised row for grid
  *
  */
export default styled(Flex)`
  flex-wrap: wrap;
  margin: 0 -${(props) => props.theme.gutter[0]}
  @media (min-width: ${(props) => props.theme.breakpoints[0]}) {
    margin: 0 -${(props) => props.theme.gutter[1]};
  }
  @media (min-width: ${(props) => props.theme.breakpoints[1]}) {
    margin: 0 -${(props) => props.theme.gutter[2]};
  }
  @media print {
    margin: 0 -${(props) => props.theme.gutter[2]};
  }
`;
