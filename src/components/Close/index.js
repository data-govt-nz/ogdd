import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from 'styles/Button';

import iconSrc from 'assets/close.svg';

const Styled = styled(Button)`
  height: 40px
  width: 40px;
  border-radius: 99999px;
  background-color: ${(props) => props.theme.colors.black};
  margin: 5px;
`;

// @media (min-width: ${(props) => props.theme.breakpoints[0]}) {
//   height: 60px
//   width: 60px;
// }
const Icon = styled.img`
  height: 18px;
  width: 18px;
  position: absolute;
  top: 11px;
  left: 11px;
`;
// @media (min-width: ${(props) => props.theme.breakpoints[0]}) {
//   height: 26px;
//   width: 26px;
//   top: 17px;
//   left: 17px;
// }

const Close = ({ altTitle, onClick }) => (
  <Styled onClick={onClick}>
    <Icon alt={altTitle} src={iconSrc} />
  </Styled>
);

Close.propTypes = {
  altTitle: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default Close;
