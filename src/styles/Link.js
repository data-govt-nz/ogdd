import styled from 'styled-components';
import Button from 'styles/Button';

/**
  * @component
  * Standard link, consistent with global 'a' of global-styles.js
  *
  *
  */
export default styled(Button)`
  text-decoration: underline;
  &:focus{
    outline: 0;
  }
`;
