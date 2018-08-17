import styled from 'styled-components';

/**
  * @component
  * Basic unstyled button
  *
  *
  */
export default styled.button`
  border: none;
  margin: 0;
  padding: 0;
  width: auto;
  overflow: visible;
  background-color: transparent;
  cursor: pointer;
  position: relative;
  font: inherit;
  display: inline;
  color: #202326;
  border-radius: 0;
  line-height: 1.15;
  font-size: ${(props) => props.theme.sizes[1]};
  &:hover{
    color: #2956D1;
    background-color: transparent;
    opacity: 1;
  }
  &:active{
    color: #2956D1;
    background-color: transparent;
  }
  &:visited{
    color: #2956D1;
    background-color: transparent;
    opacity: 1;
  }
  &:focus{
    color: #2956D1;
    box-shadow: 0;
    border-radius: 0;
  }
`;
