import styled from 'styled-components';

/**
  * @component
  * Wrapper for PageTitle Component
  *
  *
  */
export default styled.div`
  position: relative;
  margin-bottom: 5px;
  @media (min-width: ${(props) => props.theme.breakpoints[0]}) {
    margin-bottom: 30px;
  }
`;
