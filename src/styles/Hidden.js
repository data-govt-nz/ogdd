import styled from 'styled-components';

/**
  * @component
  * Hidden when viewport wider than given breakpoint as defined in theme
  *
  *
  */
export default styled.span`
  @media (min-width: ${(props) => props.min ? props.theme.breakpoints[props.min] : 0}) {
    display: none;
  }
`;
