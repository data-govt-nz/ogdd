import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Styled = styled.div`
  display: table;
  table-layout: fixed;
  width: 100%;
  line-height: 20px;
`;

const Cell = styled.div`
  display: table-cell;
  vertical-align: top;
  font-size: 14px;
`;

const DotCell = styled(Cell)`
  width: 14px;
  padding: 5px 2px;
`;

const LineCell = styled(Cell)`
  width: 14px;
  padding: 9px 7px 5px 0px;
`;

const Line = styled.div`
  width: 100%;
  border-bottom-width: 2px;
  border-bottom-style: ${(props) => props.dashed ? 'dashed' : 'solid'};
  border-bottom-color: ${(props) => props.theme.colors[props.color]};
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 9999px;
  background-color: ${(props) => props.theme.colors[props.color]};
`;

const KeyEntry = ({ color, title, line, dashed }) => (
  <Styled>
    { line &&
      <LineCell>
        <Line color={color} dashed={dashed} role="presentation" />
      </LineCell>
    }
    { !line &&
      <DotCell>
        <Dot color={color} role="presentation" />
      </DotCell>
    }
    <Cell>
      { title }
    </Cell>
  </Styled>
);

KeyEntry.propTypes = {
  color: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  line: PropTypes.bool,
  dashed: PropTypes.bool,
};

export default KeyEntry;
