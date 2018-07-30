import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Styled = styled.div`
  display: table;
  table-layout: fixed;
  width: 100%;
  line-height: 20px;
  min-height: ${(props) => props.hasTitle ? '49px' : 0};
`;

const Cell = styled.div`
  display: table-cell;
  vertical-align: top;
  padding-top: 8px;
  font-size: 15px;
`;

const IconCell = styled.div`
  display: table-cell;
  vertical-align: top;
  width: 38px;
`;

const Icon = styled.img`
  position: relative;
  left: -5px
  height: 38px;
`;

const CardTitle = ({ iconSrc, title, altTitle }) => (
  <Styled hasTitle={title !== ''}>
    <IconCell>
      <Icon alt={altTitle || ''} src={iconSrc} role={altTitle ? null : 'presentation'} />
    </IconCell>
    <Cell>
      { title }
    </Cell>
  </Styled>
);

CardTitle.propTypes = {
  title: PropTypes.string,
  altTitle: PropTypes.string,
  iconSrc: PropTypes.string,
};

CardTitle.defaultProps = {
  title: '',
};

export default CardTitle;
