import styled from 'styled-components';

export default styled.span`
  @media (min-width: ${(props) => props.theme.breakpoints[props.min]}) {
    display: none;
  }
`;
