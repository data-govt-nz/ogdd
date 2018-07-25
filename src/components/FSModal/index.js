import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// utils
import getLabel from 'utils/get-label';

// simple styles
import PageContainer from 'styles/PageContainer';

// component styles
const Styled = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: #fff;
  z-index: 99999;
`;

const Dismiss = styled.button`
  float: right;
`;

const FSModal = ({ dismiss, children }) => (
  <Styled>
    <PageContainer>
      <Dismiss onClick={dismiss} title={getLabel('screenreader.fsModal.button.dismiss')}>
        X
      </Dismiss>
      { children }
    </PageContainer>
  </Styled>
);

FSModal.propTypes = {
  dismiss: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default FSModal;
