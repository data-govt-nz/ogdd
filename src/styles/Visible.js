import styled, { css } from 'styled-components';

/**
  * @component
  * Only visible when viewport wider than given breakpoint as defined in theme
  *
  *
  */
export default styled.span`
  display: none;
  @media (min-width: ${(props) => (props.min || props.min === 0) ? props.theme.breakpoints[props.min] : 0}) {
    display: inline;
  }
  @media print {
    ${(props) => props.print === 'false' && css`
      display: none;
    `}
  }
`;
