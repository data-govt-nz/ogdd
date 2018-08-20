import styled from 'styled-components';

/**
  * @component
  * Wrapper for "read more" links
  *
  *
  */
export default styled.div`
  position: absolute;
  right: 0;
  top: 0;
  @media (min-width: ${(props) => props.theme.breakpoints[0]}) {
    top: 8px;
  }
  @media print {
    display: none;
  }
`;
