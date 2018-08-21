// vendor
import styled, { css } from 'styled-components';
import { BREAKPOINTS } from 'containers/App/constants';
// styles
import Button from 'styles/Button';

/**
  * @component
  * Header menu link
  *
  */
export default styled(Button)`
  display: inline-block;
  padding: 3px 10px;
  margin: 0 2px;
  text-align: center;
  border-radius: 99999px;
  font-size: 0.8em;
  font-weight: 600;
  max-width: 75px;
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.2);
  border: 0;
  ${(props) => props.active && css`
    color: ${props.theme.colors.white};
    background-color: ${props.theme.colors.black};
    &:hover{
      cursor: auto;
    }
  `}
  @media (min-width: ${(props) => props.theme.breakpoints[BREAKPOINTS.SMALL]}) {
    font-size: 0.9em;
    min-width: 100px;
    max-width: none;
    padding: 7px 20px;
    margin: 0 5px;
  }
  @media (min-width: ${(props) => props.theme.breakpoints[BREAKPOINTS.MEDIUM]}) {
    font-size: 1em;
    padding: 10px 20px;
  }
  &:hover{
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.2);
    color: ${(props) => props.theme.colors.white};
    background-color: ${(props) => props.theme.colors.black};
  }
  &:focus{
    outline: 0;
    color: ${(props) => props.theme.colors.white};
    background-color: ${(props) => props.theme.colors.dark};
    border-radius: 99999px;
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.2) !important;
  }
  &:hover:focus{
    background-color: ${(props) => props.theme.colors.black};
  }
  &:active{
    color: ${(props) => props.theme.colors.white};
    background-color: ${(props) => props.theme.colors.black};
  }
  &:active:hover{
    cursor: auto;
  }
`;
