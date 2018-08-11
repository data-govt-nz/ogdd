import styled from 'styled-components';

/**
  * @component
  * Only visible when viewport wider than given breakpoint as defined in theme
  *
  *
  */
export default styled.span`
  display: none;
  @media (min-width: ${(props) => props.min ? props.theme.breakpoints[props.min] : 0}) {
    display: inline;
  }
`;
