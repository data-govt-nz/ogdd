import React from 'react';
import PropTypes from 'prop-types';
import { ICONS } from 'containers/App/constants';
import asArray from 'utils/as-array';

import SVG from './SVG';

class Icon extends React.PureComponent {
  render() {
    const { name, title, size, sizes, color, iconSize, text, textRight, textLeft, stroke, themeColor } = this.props;
    const icon = ICONS[name];
    if (icon) {
      const iSize = icon.size || iconSize;
      const iconPaths = icon.paths || icon.path || icon;
      return (
        <SVG
          viewBox={`0 0 ${iSize} ${iSize}`}
          preserveAspectRatio="xMidYMid meet"
          size={size || `${iSize}px`}
          color={color}
          themeColor={themeColor}
          text={text}
          textLeft={textLeft}
          textRight={textRight}
          stroke={stroke}
          sizes={sizes}
          aria-hidden={title ? 'false' : 'true'}
          role={title ? 'img' : 'presentation'}
        >
          <title>{title}</title>
          <path d={asArray(iconPaths).reduce((memo, path) => `${memo}${path}`, '')}></path>
        </SVG>
      );
    }
    return null;
  }
}

Icon.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  size: PropTypes.string,
  iconSize: PropTypes.number,
  color: PropTypes.string,
  themeColor: PropTypes.string,
  text: PropTypes.bool,
  textLeft: PropTypes.bool,
  textRight: PropTypes.bool,
  stroke: PropTypes.bool,
  sizes: PropTypes.object,
};
Icon.defaultProps = {
  name: 'placeholder',
  iconSize: 24,
  textLeft: false,
  textRight: false,
  title: '',
};


export default Icon;
