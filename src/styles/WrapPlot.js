import styled from 'styled-components';

/**
  * @component
  * Plot wrapper to center plot on card.
  * Adds padding on right to make up for left axis
  * (react-vis left margin default is 40, custom right margin 13 )
  *
  */
export default styled.div`
  padding-right: 27px;
`;
