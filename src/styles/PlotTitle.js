import styled from 'styled-components';

export default styled.div`
  font-weight: 600;
  margin-bottom: 8px;
  @media (min-width: ${(props) => props.theme.breakpoints[0]}) {
    margin-bottom: 10px;
  }
  @media (min-width: ${(props) => props.theme.breakpoints[1]}) {
    margin-bottom: 8px;
  }
`;
