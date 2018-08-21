import styled from 'styled-components';
import { BREAKPOINTS } from 'containers/App/constants';

/**
  * @component
  * Wrapper for "read more" links (only used for small screens)
  *
  */
export default styled.div`
  position: absolute;
  right: 0;
  top: 0;
  @media (min-width: ${(props) => props.theme.breakpoints[BREAKPOINTS.SMALL]}) {
    top: 8px;
  }
  @media print {
    display: none;
  }
`;
