// vendor
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// styles
import Button from 'styles/Button';

// component styles
const Styled = styled(Button)`
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.2);
  padding: 4px 10px ${(props) => props.withoutPaddingBottom ? 0 : 10}px;
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
    border-top: 1px solid ${(props) => props.theme.colors.light};
    page-break-inside: avoid;
  }
`;
const StyledDiv = Styled.withComponent('div').extend`
  cursor: auto;
`;

/**
  * Card component - renders as button or hoverable div
  *
  * @return {Component} Card
  */
const Card = ({
  isButton,
  onMouseEnter,
  onMouseLeave,
  onClick,
  children,
  title,
  withoutPaddingBottom,
 }) => isButton
? (
  <Styled
    onMouseEnter={onMouseEnter || (() => true)}
    hover={onMouseEnter || false}
    onMouseLeave={onMouseLeave}
    onClick={onClick}
    role="button"
    title={title}
    tabIndex={0}
    withoutPaddingBottom={withoutPaddingBottom}
  >
    {children}
  </Styled>
)
: <StyledDiv
  hover={!!onMouseEnter || false}
  onMouseEnter={onMouseEnter || (() => false)}
  onMouseLeave={onMouseLeave}
  onClick={onClick}
  withoutPaddingBottom={withoutPaddingBottom}
>
  { children }
</StyledDiv>
;

Card.propTypes = {
  /** mouse enter handler */
  onMouseEnter: PropTypes.func,
  /** mouse leave handler */
  onMouseLeave: PropTypes.func,
  /** click handler */
  onClick: PropTypes.func,
  /** button title */
  title: PropTypes.string,
  /** card content */
  children: PropTypes.node.isRequired,
  /** do not add bottom padding */
  withoutPaddingBottom: PropTypes.bool,
  /** if rendered as button */
  isButton: PropTypes.bool,
};

Card.defaultProps = {
  isButton: false,
};

export default Card;
