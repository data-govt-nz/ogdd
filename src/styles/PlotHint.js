import styled from 'styled-components';

export default styled.div`
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors[props.background]};
  padding: 5px 10px;
  border-radius: 9999px;
  margin-bottom: 6px;
  font-size: ${(props) => props.theme.sizes[1]};
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.2);

  &:after {
    content:'';
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    margin: -6px auto 0;
    width: 0;
    height: 0;
    border-top: solid 4px ${(props) => props.theme.colors[props.background]};
    border-left: solid 4px transparent;
    border-right: solid 4px transparent;
}
`;
