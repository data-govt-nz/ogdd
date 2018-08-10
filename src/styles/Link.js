/**
  * Description
  *
  * @author [tmfrnz](https://github.com/tmfrnz)
  */
import styled from 'styled-components';
import Button from 'styles/Button';

// same as 'a' of global-styles.js
export default styled(Button)`
  text-decoration: underline;
  color: #202326;
  &:hover{
    color: #2956D1;
  }
  &:focus{
    outline: 0;
    color: #2956D1;
  }
`;
