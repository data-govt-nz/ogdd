import styled from 'styled-components';
import Button from 'styles/Button';

/**
  * Skip to main content button for keyboard and screenreader support. Hidden unless focused
  *
  * @author [tmfrnz](https://github.com/tmfrnz)
  */
export default styled(Button)`
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
  &:focus{
    position: absolute;
    left: 0;
    padding: 2px 5px;
    width: auto;
    height: auto;
    background-color: #fff;
    z-index: 99999;
    box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.2);
  }
  &:hover{
    color: #2956D1;
  }
`;
