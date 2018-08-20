import styled from 'styled-components';

/**
  * @component
  * Card header wrapper
  *
  *
  */
export default styled.div`
  position: relative;
  padding-bottom: 16px;
  padding-right: ${(props) => props.dismissable ? 50 : 0}px;
  @media (min-width: ${(props) => props.theme.breakpoints[0]}) {
    padding-right: 0;
    min-height: ${(props) => props.hasMinHeight ? '66px' : 0};
  }
`;
