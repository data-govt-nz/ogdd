import styled from 'styled-components';

export default styled.button`
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
  &:focus{
    position: absolute;
    left: 0;
    width: auto;
    height: auto;
    background-color: #fff;
    z-index: 99999;
    box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.2);
  }
`;
