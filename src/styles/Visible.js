import styled from 'styled-components';

export default styled.span`
  display: none;
  @media (min-width: ${(props) => props.theme.breakpoints[props.min]}) {
    display: inline;
  }
`;
