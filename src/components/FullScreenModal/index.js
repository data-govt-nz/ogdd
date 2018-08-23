// vendor
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// utils
import getLabel from 'utils/get-label';
// components
import Close from 'components/Close';
// simple styles
import ContentContainer from 'styles/ContentContainer';

// component styles
const Styled = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: #fff;
  z-index: 99999;
  overflow-y: auto;
`;
const Dismiss = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
`;

/**
  * Dismissable full screen modal - used for additional page content on small screens only
  *
  * @return {Component} Full screen modal
  *
  */
const FullScreenModal = ({ dismiss, children }) => (
  <Styled>
    <Dismiss>
      <Close
        onClick={dismiss}
        altTitle={getLabel('screenreader.fsModal.button.dismiss')}
      />
    </Dismiss>
    <ContentContainer>
      { children }
    </ContentContainer>
  </Styled>
);

FullScreenModal.propTypes = {
  /** dismiss handler */
  dismiss: PropTypes.func.isRequired,
  /** modal content */
  children: PropTypes.node.isRequired,
};

export default FullScreenModal;
