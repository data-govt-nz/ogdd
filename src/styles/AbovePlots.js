import styled from 'styled-components';
import { BREAKPOINTS } from 'containers/App/constants';

/**
  * @component
  * Wrapper for items displayed above plots, e.g. plot select options
  * - should occupy same space as /styles/PlotTitle
  *
  */
export default styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 8px;
  font-weight: 500;
  @media (min-width: ${(props) => props.theme.breakpoints[BREAKPOINTS.SMALL]}) {
    margin-bottom: 10px;
  }
  @media (min-width: ${(props) => props.theme.breakpoints[BREAKPOINTS.MEDIUM]}) {
    margin-bottom: 8px;
  }
`;
