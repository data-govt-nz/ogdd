// vendor
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// component styles
const Styled = styled.div`
  display: table;
  table-layout: fixed;
  width: 100%;
  margin-bottom: ${(props) => props.small ? 2 : 5}px;;
`;
const Cell = styled.div`
  display: table-cell;
  vertical-align: ${(props) => props.dot ? 'middle' : 'top'};
  font-size: ${(props) => props.small ? props.theme.sizes[0] : props.theme.sizes[1]};
  font-weight: 500;
`;
const DotCell = styled(Cell)`
  vertical-align: middle;
  width: 18px;
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
  border-bottom-color: ${(props) => props.color
    ? props.color
    : props.theme.colors[props.themeColor]
  };
`;
const Dot = styled.div`
  width: ${(props) => props.small ? 8 : 9}px;
  height: ${(props) => props.small ? 8 : 9}px;
  border-radius: ${(props) => props.area ? 0 : 9999}px;
  background-color: ${(props) => {
    if (props.outline) {
      return 'transparent';
    }
    return props.color
      ? props.color
      : props.theme.colors[props.themeColor];
  }} !important;
  border: 1px solid;
  border-color: ${(props) => props.color
    ? props.color
    : props.theme.colors[props.themeColor]
  };
  @media print {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    background-color: unset;
    box-shadow: inset 0 0 0 1000px ${(props) => props.color
      ? props.color
      : props.theme.colors[props.themeColor]
    };
  }
`;

/**
  * Key item component for plots - should be placed inside styles/Key
  * A key item consists of a label and a symbol that can either be a circle (default), square or a line
  * - circles (dots) and squares (areas) can be solid (default) or outlined
  * - lines can be continuous (default) or dashed
  *
  * @return {Component} Key entry
  */
const KeyEntry = ({
  themeColor,
  color,
  title,
  line,
  dashed,
  small,
  outline,
  area,
}) => (
  <Styled small>
    { line &&
      <LineCell>
        <Line small={small} themeColor={themeColor} color={color} dashed={dashed} role="presentation" />
      </LineCell>
    }
    { !line &&
      <DotCell small={small}>
        <Dot themeColor={themeColor} color={color} outline={outline} role="presentation" area={area} />
      </DotCell>
    }
    <Cell small={small} dot={!line}>
      { title }
    </Cell>
  </Styled>
);

KeyEntry.propTypes = {
  /** the color key as defined in global theme */
  themeColor: PropTypes.string,
  /** the raw color value */
  color: PropTypes.string,
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
  /** if key item is square */
  area: PropTypes.bool,
};

export default KeyEntry;
