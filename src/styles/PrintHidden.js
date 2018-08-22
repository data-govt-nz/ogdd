import styled from 'styled-components';

/**
  * @component
  * Only show when printing
  */
export default styled.span`
  display: inline;
  @media print {
    display: none;
  }
`;
