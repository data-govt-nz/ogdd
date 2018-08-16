// vendor
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// styles
import Button from 'styles/Button';
// assets
import iconSrc from 'assets/close.svg';

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
  }
  &:focus{
    outline: 0;
    background-color: ${(props) => props.theme.colors.dark};
  }
  @media print {
    display: none;
  }
`;
const Icon = styled.img`
  height: 18px;
  width: 18px;
  position: absolute;
  top: 11px;
  left: 11px;
`;

/**
  * Close/dismiss icon component
  *
  * @return {Component} Close/dismiss icon component
  *
  */
const Close = ({ altTitle, onClick }) => (
  <Styled onClick={onClick}>
    <Icon alt={altTitle} src={iconSrc} />
  </Styled>
);

Close.propTypes = {
  /** the alt attribute */
  altTitle: PropTypes.string,
  /** on click handler */
  onClick: PropTypes.func.isRequired,
};

export default Close;
