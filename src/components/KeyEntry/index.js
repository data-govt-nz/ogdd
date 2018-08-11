// vendor
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// component styles
const Styled = styled.div`
  display: table;
  table-layout: fixed;
  width: 100%;
  line-height: 20px;
`;
const Cell = styled.div`
  display: table-cell;
  vertical-align: ${(props) => props.dot ? 'middle' : 'top'};
  font-size: ${(props) => props.small ? props.theme.sizes[0] : props.theme.sizes[1]};
`;
const DotCell = styled(Cell)`
  vertical-align: middle;
  width: 14px;
  padding: 5px 2px;
`;
const LineCell = styled(Cell)`
  width: 14px;
  padding: 10px 7px 5px 0px;
`;
const Line = styled.div`
  width: 100%;
  border-bottom-width: ${(props) => props.small ? 1 : 2}px;
  border-bottom-style: ${(props) => props.dashed ? 'dashed' : 'solid'};
  border-bottom-color: ${(props) => props.colorValue
    ? props.colorValue
    : props.theme.colors[props.color]
  };
`;
const Dot = styled.div`
  width: ${(props) => props.small ? 8 : 10}px;
  height: ${(props) => props.small ? 8 : 10}px;
  border-radius: 9999px;
  background-color: ${(props) => {
    if (props.outline) {
      return 'transparent';
    }
    return props.colorValue
      ? props.colorValue
      : props.theme.colors[props.color];
  }};
  border: 1px solid;
  border-color: ${(props) => props.colorValue
    ? props.colorValue
    : props.theme.colors[props.color]
  };
`;

/**
  * Key item component for plots - should be placed inside styles/Key
  * A key item consists of a label and a symbol that can either be a circle (default) or a line
  * - circles (dots) can be solid (default) or outlined
  * - lines can be continuous (default) or dashed
  *
  * @return {Component} Key entry
  * @author [tmfrnz](https://github.com/tmfrnz)
  */
const KeyEntry = ({
  color,
  colorValue,
  title,
  line,
  dashed,
  small,
  outline,
}) => (
  <Styled>
    { line &&
      <LineCell>
        <Line small={small} color={color} colorValue={colorValue} dashed={dashed} role="presentation" />
      </LineCell>
    }
    { !line &&
      <DotCell small={small}>
        <Dot color={color} colorValue={colorValue} outline={outline} role="presentation" />
      </DotCell>
    }
    <Cell small={small} dot={!line}>
      { title }
    </Cell>
  </Styled>
);

KeyEntry.propTypes = {
  /** the color key as defined in global theme */
  color: PropTypes.string,
  /** the raw color value */
  colorValue: PropTypes.string,
  /** the key label as displayed */
  title: PropTypes.string.isRequired,
  /** key style: if true style is "line", if false or null style is "circle" */
  line: PropTypes.bool,
  /** line style for lines */
  dashed: PropTypes.bool,
  /** circle styles for circles */
  outline: PropTypes.bool,
  /** if key item is small */
  small: PropTypes.bool,
};

export default KeyEntry;
