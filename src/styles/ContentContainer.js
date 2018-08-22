import styled from 'styled-components';
import { BREAKPOINTS } from 'containers/App/constants';
/**
  * @component
  * Page container to wrap page content
  *
  */
export default styled.div`
  max-width: ${(props) => props.theme.maxWidth};
  margin: 0 auto;
  position: relative;
  padding: 0 20px ${(props) => props.withoutmargin ? 0 : 50}px;
  @media (min-width: ${(props) => props.theme.breakpoints[BREAKPOINTS.SMALL]}) {
    padding-right: 25px;
    padding-left: 25px;
  }
  @media (min-width: ${(props) => props.theme.breakpoints[BREAKPOINTS.MEDIUM]}) {
    padding-right: 0;
    padding-left: 0;
  }
  @media print {
    max-width: none;
    padding: 0 10px ${(props) => props.withoutmargin ? 0 : 50}px;
  }
`;
