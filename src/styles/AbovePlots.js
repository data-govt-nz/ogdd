import styled from 'styled-components';

/**
  * @component
  * Wrapper for items displayed above plots, e.g. plot options
  *
  *
  */
export default styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 8px;
  font-weight: 500;
  @media (min-width: ${(props) => props.theme.breakpoints[0]}) {
    margin-bottom: 10px;
  }
  @media (min-width: ${(props) => props.theme.breakpoints[1]}) {
    margin-bottom: 8px;
  }
`;
