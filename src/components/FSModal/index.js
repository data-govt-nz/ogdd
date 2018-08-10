/**
  * Description
  *
  * @author [tmfrnz](https://github.com/tmfrnz)
  */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// utils
import getLabel from 'utils/get-label';

import Close from 'components/Close';

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

const Dismiss = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`;

const FSModal = ({ dismiss, children }) => (
  <Styled>
    <PageContainer>
      <Dismiss>
        <Close
          onClick={dismiss}
          altTitle={getLabel('screenreader.fsModal.button.dismiss')}
        />
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
