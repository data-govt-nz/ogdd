import styled from 'styled-components';

/**
  * @component
  * Page container to wrap page content
  *
  *
  */
export default styled.div`
  max-width: ${(props) => props.theme.maxWidth};
  margin: 0 auto;
  position: relative;
  padding: 0 10px;
  @media (min-width: ${(props) => props.theme.breakpoints[0]}) {
    padding: 0 25px;
  }
  @media (min-width: ${(props) => props.theme.breakpoints[1]}) {
    padding: 0;
  }
`;
