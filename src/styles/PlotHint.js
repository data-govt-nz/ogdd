import styled from 'styled-components';

export default styled.div`
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors[props.background]};
  padding: 5px 10px;
  border-radius: 9999px;
  margin-top: ${(props) => props.bottom ? '8px' : '0'};
  margin-bottom: ${(props) => props.bottom ? '0' : '6px'};
  font-size: ${(props) => props.theme.sizes[1]};
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.2);

  &:after {
    content:'';
    position: absolute;
    top: ${(props) => props.bottom ? 'auto' : '100%'};
    left: 0;
    right: 0;
    bottom: ${(props) => props.bottom ? '100%' : 'auto'};
    margin: ${(props) => props.bottom ? '0 auto -8px' : '-6px auto 0'};
    width: 0;
    height: 0;
    border-top: solid ${(props) => props.bottom ? '0' : '4px'} ${(props) => props.theme.colors[props.background]};
    border-bottom: solid ${(props) => props.bottom ? '4px' : '0'} ${(props) => props.theme.colors[props.background]};
    border-left: solid 4px transparent;
    border-right: solid 4px transparent;
}
`;
