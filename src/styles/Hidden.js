import styled from 'styled-components';
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
    : props.theme.breakpoints[BREAKPOINTS.SMALL]
  }) {
    display: none;
  }
  @media print {
    display: ${(props) => props.print
      ? 'inline-block'
      : 'none'
    };
  }
`;
