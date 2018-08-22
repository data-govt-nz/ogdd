import styled from 'styled-components';
import { BREAKPOINTS } from 'containers/App/constants';

/**
  * @component
  * Plot title shown above Chart
  * - should occupy same space as /styles/AbovePlots
  *
  */
export default styled.div`
  font-weight: 600;
  margin-top: -8px;
  margin-bottom: 16px;
  @media (min-width: ${(props) => props.theme.breakpoints[BREAKPOINTS.SMALL]}) {
    margin-top: -10px;
    margin-bottom: 20px;
    font-size: 15px;
  }
  @media (min-width: ${(props) => props.theme.breakpoints[BREAKPOINTS.MEDIUM]}) {
    margin-top: -8px;
    margin-bottom: 16px;
  }
`;
