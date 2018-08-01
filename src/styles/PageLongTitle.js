import styled from 'styled-components';

export default styled.h1`
  font-weight: normal
  font-size: ${(props) => props.theme.sizes[2]};
  margin-top: 0;
  margin-bottom: 20px;
  margin-right: 45px;
  min-height: 38px;
  @media (min-width: ${(props) => props.theme.breakpoints[0]}) {
    font-size: ${(props) => props.theme.sizes[3]};
    margin-bottom: 40px;
    margin-right: 65px;
  }
`;
