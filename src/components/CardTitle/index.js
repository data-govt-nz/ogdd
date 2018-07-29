import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Styled = styled.div`
  display: table;
  table-layout: fixed;
  width: 100%;
  line-height: 20px;
  min-height: ${(props) => props.hasTitle ? '40px' : 0};
`;

const Cell = styled.div`
  display: table-cell;
  vertical-align: top;
`;

const IconCell = styled(Cell)`
  width: 20px;
`;

const Icon = styled.img`
  position: relative;
  left: -7px
  height: 20px;
`;

const CardTitle = ({ iconSrc, title }) => (
  <Styled hasTitle={title !== ''}>
    <IconCell>
      <Icon alt="" src={iconSrc} role="presentation" />
    </IconCell>
    <Cell>
      { title }
    </Cell>
  </Styled>
);

CardTitle.propTypes = {
  title: PropTypes.string,
  iconSrc: PropTypes.string,
};

CardTitle.defaultProps = {
  title: '',
};

export default CardTitle;
