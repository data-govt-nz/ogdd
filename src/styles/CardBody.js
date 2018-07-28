import styled from 'styled-components';

export default styled.div`
  padding-right: 30px;
  padding-top: ${(props) => props.withoutTitle ? 20 : 0}px;
`;
