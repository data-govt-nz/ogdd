import styled from 'styled-components';

/**
  * @component
  * Principal page title
  *
  *
  */
export default styled.h1`
  font-weight: 500;
  font-size: ${(props) => props.theme.sizes[2]};
  margin-top: 0;
  margin-bottom: 30px;
  margin-right: 0;
  min-height: 42px;
  @media (min-width: ${(props) => props.theme.breakpoints[0]}) {
    font-size: ${(props) => props.theme.sizes[3]};
  }
`;
