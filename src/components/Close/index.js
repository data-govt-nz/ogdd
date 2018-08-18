// vendor
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Icon from 'components/Icon';
// styles
import Button from 'styles/Button';

// component styles
const Styled = styled(Button)`
  height: 40px
  width: 40px;
  border-radius: 99999px;
  background-color: ${(props) => props.theme.colors.black};
  margin: 5px;
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.2);
  &:hover{
    background-color: ${(props) => props.theme.colors.dark};
    border-radius: 99999px;
  }
  &:focus{
    outline: 0;
    background-color: ${(props) => props.theme.colors.dark};
    border-radius: 99999px;
  }
  @media print {
    display: none;
  }
`;

/**
  * Close/dismiss icon component
  *
  * @return {Component} Close/dismiss icon component
  *
  */
const Close = ({ altTitle, onClick }) => (
  <Styled onClick={onClick}>
    <Icon title={altTitle} name="close" themeColor="white" iconSize={10} />
  </Styled>
);

Close.propTypes = {
  /** the alt attribute */
  altTitle: PropTypes.string,
  /** on click handler */
  onClick: PropTypes.func.isRequired,
};

export default Close;
