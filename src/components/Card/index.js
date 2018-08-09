import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from 'styles/Button';

const Styled = styled(Button)`
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.2);
  margin: 5px 5px 25px;
  padding: 4px 10px 10px;
  text-align: left;
  &:hover {
    ${(props) => props.hover ? 'box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.6);' : ''}
  }
  &:focus{
    outline: 0;
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.6);
  }
`;

const StyledDiv = Styled.withComponent('div').extend`
  cursor: auto;
`;

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
  onMouseEnter={onMouseEnter || (() => true)}
  onMouseLeave={onMouseLeave}
  onTouchStart={onTouchStart}
>
  { children }
</StyledDiv>
;

Card.propTypes = {
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onTouchStart: PropTypes.func,
  onClick: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Card;
