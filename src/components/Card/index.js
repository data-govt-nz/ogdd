// vendor
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// styles
import Button from 'styles/Button';

// component styles
const Styled = styled(Button)`
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.2);
  margin: 5px 5px 25px;
  padding: 4px 10px 10px;
  text-align: left;
  max-width: 100%;
  &:hover {
    color: ${(props) => props.theme.colors.black};
    ${(props) => props.hover ? 'box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.6);' : ''}
  }
  &:focus{
    outline: 0;
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.6);
    color: ${(props) => props.theme.colors.black};
  }
  @media print {
    box-shadow: none;
  }
`;
const StyledDiv = Styled.withComponent('div').extend`
  cursor: auto;
`;

/**
  * Card component - renders as button if onClick handler present or hoverable div
  *
  * @return {Component} Card
  *
  */
const Card = ({ onMouseEnter, onMouseLeave, onTouchStart, onClick, children, title }) => onClick
? (
  <Styled
    onMouseEnter={onMouseEnter || (() => true)}
    hover={onMouseEnter || false}
    onMouseLeave={onMouseLeave}
    onTouchStart={onTouchStart}
    onClick={onClick}
    role={onClick ? 'button' : null}
    title={onClick ? title : null}
    tabIndex={onClick ? 0 : null}
  >
    {children}
  </Styled>
)
: <StyledDiv
  hover
  onMouseEnter={onMouseEnter || (() => true)}
  onMouseLeave={onMouseLeave}
  onTouchStart={onTouchStart}
>
  { children }
</StyledDiv>
;

Card.propTypes = {
  /** mouse enter handler */
  onMouseEnter: PropTypes.func,
  /** mouse leave handler */
  onMouseLeave: PropTypes.func,
  /** touch handler */
  onTouchStart: PropTypes.func,
  /** click handler */
  onClick: PropTypes.func,
  /** button title */
  title: PropTypes.string,
  /** card content */
  children: PropTypes.node.isRequired,
};

export default Card;
