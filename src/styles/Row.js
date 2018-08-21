import styled from 'styled-components';
import { Flex } from 'grid-styled';
import { BREAKPOINTS } from 'containers/App/constants';

/**
  * @component
  * Customised row for grid
  * - grid gutter is specified in app constants (unless `withoutgutter` is set)
  *
  */
export default styled(Flex)`
  flex-wrap: wrap;
  margin: 0 -${(props) => props.withoutgutter ? 0 : props.theme.gutter[0]}
  @media (min-width: ${(props) => props.theme.breakpoints[BREAKPOINTS.SMALL]}) {
    margin: 0 -${(props) => props.withoutgutter ? 0 : props.theme.gutter[1]};
  }
  @media (min-width: ${(props) => props.theme.breakpoints[BREAKPOINTS.MEDIUM]}) {
    margin: 0 -${(props) => props.withoutgutter ? 0 : props.theme.gutter[2]};
  }
  @media print {
    margin: 0 -${(props) => props.withoutgutter ? 0 : props.theme.gutter[2]};
  }
`;
