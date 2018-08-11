import styled from 'styled-components';

/**
  * Wrapper for "read more" links
  *
  * @author [tmfrnz](https://github.com/tmfrnz)
  */
export default styled.div`
  position: absolute;
  right: 0;
  top: 3px;
  @media (min-width: ${(props) => props.theme.breakpoints[0]}) {
    top: 8px;
  }
`;
