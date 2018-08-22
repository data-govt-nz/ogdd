import styled from 'styled-components';
import { BREAKPOINTS } from 'containers/App/constants';

/**
  * @component
  * Wrapper for PageTitle Component
  *
  */
export default styled.div`
  position: relative;
  @media (min-width: ${(props) => props.theme.breakpoints[BREAKPOINTS.SMALL]}) {
    margin-bottom: 30px;
  }
`;
