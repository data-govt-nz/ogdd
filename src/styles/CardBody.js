import styled from 'styled-components';

/**
  * @component
  * Card body wrapper
  *
  */
export default styled.div`
  padding-top: ${(props) => props.withoutTitle ? 20 : 0}px;
`;
