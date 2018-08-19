import React from 'react';
import PropTypes from 'prop-types';
import { ICONS } from 'containers/App/constants';
import asArray from 'utils/as-array';

import SVG from './SVG';

class Icon extends React.PureComponent {
  render() {
    const { name, title, color, size, iconSize, themeColor } = this.props;
    const icon = ICONS[name];
    if (icon) {
      const iSizeX = (icon.sizes && icon.sizes[0]) || icon.size || iconSize;
      const iSizeY = (icon.sizes && icon.sizes[1]) || icon.size || iconSize;
      const iconPaths = icon.paths || icon.path || icon;
      return (
        <SVG
          viewBox={`0 0 ${iSizeX} ${iSizeY}`}
          preserveAspectRatio="xMidYMid meet"
          sizes={{
            width: `${size || iSizeX}px`,
            height: `${size || iSizeY}px`,
          }}
          color={color}
          themeColor={themeColor}
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
  iconSize: PropTypes.number,
  size: PropTypes.number,
  color: PropTypes.string,
  themeColor: PropTypes.string,
};
Icon.defaultProps = {
  name: 'placeholder',
  iconSize: 38,
  title: '',
};


export default Icon;
