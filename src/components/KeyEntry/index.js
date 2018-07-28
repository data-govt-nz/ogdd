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

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 9999px;
  background-color: ${(props) => props.theme.colors[props.color]};
`;

const KeyEntry = ({ color, title }) => (
  <Styled>
    <DotCell>
      <Dot color={color} role="presentation" />
    </DotCell>
    <Cell>
      { title }
    </Cell>
  </Styled>
);

KeyEntry.propTypes = {
  color: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default KeyEntry;
