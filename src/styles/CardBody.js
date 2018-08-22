import styled from 'styled-components';

/**
  * @component
  * Card body wrapper
  *
  */
export default styled.div`
  padding-top: ${(props) => props.withoutTitle ? 25 : 0}px;
  @media print {
    page-break-inside: avoid;
  }
`;
