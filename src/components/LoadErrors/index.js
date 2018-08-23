import React from 'react';
// import PropTypes from 'prop-types';
// import { Map } from 'immutable';
import styled from 'styled-components';

import Label from 'components/Label';
import ContentContainer from 'styles/ContentContainer';
import PageLongTitle from 'styles/PageLongTitle';

const StyledP = styled.p`
  font-size: 16px;
`;

/**
  * Simple Error message component for loading errors
  *
  * @return {Component} Loading Error
  *
  */
const LoadErrors = () => (
  <ContentContainer>
    <PageLongTitle>
      <Label id="app.sorry" />
    </PageLongTitle>
    <StyledP>
      <Label id="app.loadErrors" />
    </StyledP>
  </ContentContainer>
);
//
// LoadErrors.propTypes = {
//   errors: PropTypes.instanceOf(Map),
// };

export default LoadErrors;
