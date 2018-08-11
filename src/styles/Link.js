import styled from 'styled-components';
import Button from 'styles/Button';

/**
  * Standard link, consistent with global 'a' of global-styles.js
  *
  * @author [tmfrnz](https://github.com/tmfrnz)
  */
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
