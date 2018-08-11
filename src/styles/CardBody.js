import styled from 'styled-components';

/**
  * Card body wrapper
  *
  * @author [tmfrnz](https://github.com/tmfrnz)
  */
export default styled.div`
  padding-top: ${(props) => props.withoutTitle ? 20 : 0}px;
`;
