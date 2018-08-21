import styled from 'styled-components';
import { BREAKPOINTS } from 'containers/App/constants';
/**
  * @component
  * Page container to wrap page content
  *
  *
  */
export default styled.div`
  max-width: ${(props) => props.theme.maxWidth};
  margin: 0 auto ${(props) => props.withoutmargin ? 0 : 50}px;
  position: relative;
  padding: 0 10px;
  @media (min-width: ${(props) => props.theme.breakpoints[BREAKPOINTS.SMALL]}) {
    padding: 0 25px;
  }
  @media (min-width: ${(props) => props.theme.breakpoints[BREAKPOINTS.MEDIUM]}) {
    padding: 0;
  }
`;
