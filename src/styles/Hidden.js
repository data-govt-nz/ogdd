import styled, { css } from 'styled-components';
import { BREAKPOINTS } from 'containers/App/constants';

/**
  * @component
  * Responsive style: Hidden when viewport wider than given breakpoint as defined in theme.
  * (See also /styles/Visible)
  *
  */
export default styled.span`
  @media (min-width: ${(props) => (props.min || props.min === BREAKPOINTS.SMALL)
    ? props.theme.breakpoints[props.min]
    : BREAKPOINTS.SMALL
  }) {
    display: none;
  }
  @media print {
    ${(props) => props.print && css`
      display: inline-block;
    `}
  }
`;
