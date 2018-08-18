import styled from 'styled-components';

const SVG = styled.svg`
  fill: ${(props) => {
    if (props.color) return props.color;
    if (props.themeColor) return props.theme.colors[props.themeColor];
    return 'currentColor';
  }};
  stroke: ${(props) => {
    if (props.stroke) {
      if (props.color) return props.color;
      if (props.themeColor) return props.theme.colors[props.themeColor];
      return 'currentColor';
    }
    return 'none';
  }};
  bottom: ${(props) => props.text ? 0.1 : 0}em;
  position: relative;
  display: inline-block;
  vertical-align: middle;
  margin-right: ${(props) => props.textLeft ? (parseFloat(props.size) / 4) + props.size.split(/[0-9]+/)[1] : 0};
  margin-left: ${(props) => props.textRight ? (parseFloat(props.size) / 4) + props.size.split(/[0-9]+/)[1] : 0};
  width: ${(props) => (props.sizes && props.sizes.mobile) ? props.sizes.mobile : props.size};
  height: ${(props) => (props.sizes && props.sizes.mobile) ? props.sizes.mobile : props.size};
`;

SVG.defaultProps = {
  size: '1em',
  paletteIndex: 0,
};

export default SVG;
