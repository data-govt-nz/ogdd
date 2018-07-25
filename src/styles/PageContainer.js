import styled from 'styled-components';

export default styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 ${(props) => props.theme.gutter[0]}
  @media (min-width: ${(props) => props.theme.breakpoints[0]}) {
    padding: 0 ${(props) => props.theme.gutter[1]};
  }
  @media (min-width: ${(props) => props.theme.breakpoints[1]}) {
    padding: 0 ${(props) => props.theme.gutter[2]};
  }
  position: relative;
`;
