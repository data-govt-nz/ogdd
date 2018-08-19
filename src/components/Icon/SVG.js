import styled from 'styled-components';

const SVG = styled.svg`
  fill: ${(props) => {
    if (props.color) return props.color;
    if (props.themeColor) return props.theme.colors[props.themeColor];
    return 'currentColor';
  }};
  position: relative;
  display: inline-block;
  vertical-align: middle;
  width: ${(props) => (props.sizes && props.sizes.width) ? props.sizes.width : props.size};
  height: ${(props) => (props.sizes && props.sizes.height) ? props.sizes.height : props.size};
`;

SVG.defaultProps = {
  size: '1em',
  paletteIndex: 0,
};

export default SVG;
