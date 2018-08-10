/**
  * Only visible when viewport wider than given breakpoint as defined in theme
  *
  * @author [tmfrnz](https://github.com/tmfrnz)
  */
import styled from 'styled-components';

export default styled.span`
  display: none;
  @media (min-width: ${(props) => props.min ? props.theme.breakpoints[props.min] : 0}) {
    display: inline;
  }
`;
