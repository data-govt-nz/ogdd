import styled, { css } from 'styled-components';
import { BREAKPOINTS } from 'containers/App/constants';

/**
  * @component
  * Responsive style: Only visible when viewport wider than given breakpoint as defined in theme
  * (See also /styles/Hidden)
  *
  */
export default styled.span`
  display: none;
  @media (min-width: ${(props) => (props.min || props.min === BREAKPOINTS.SMALL)
    ? props.theme.breakpoints[props.min]
    : BREAKPOINTS.SMALL
  }) {
    display: inline;
  }
  @media print {
    ${(props) => props.print === 'false' && css`
      display: none;
    `}
  }
`;
