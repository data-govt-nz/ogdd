// vendor
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// component styles
const Styled = styled.div`
  cursor: pointer;
  overflow: visible;
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.2);
  padding: 4px 10px ${(props) => props.withoutPaddingBottom ? 0 : 10}px;
  text-align: left;
  max-width: 100%;
  font-size: ${(props) => props.theme.sizes[1]};
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
const StyledDiv = styled(Styled)`
  cursor: auto;
`;

const KEY_ENTER = 13;
const KEY_SPACE = 32;

/**
  * Card component - renders as button or hoverable div
  * - update: as Firefox does not pass events to button children buttons are rendered as clickable divs
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
    onKeyPress={(e) => {
      const key = e.charCode || e.keyCode;
      if (key === KEY_ENTER || key === KEY_SPACE) {
        return onClick(e);
      }
      return false;
    }}
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
