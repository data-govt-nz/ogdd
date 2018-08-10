/**
  * Description
  *
  * @author [tmfrnz](https://github.com/tmfrnz)
  */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import setLinkTarget from 'utils/set-link-target';

const Styled = styled.div`
  padding: 10px;
`;

/* eslint-disable react/no-danger */
const AsideContent = ({ title, html, text, children }) => (
  <Styled>
    { title }
    { html &&
      <div dangerouslySetInnerHTML={{ __html: setLinkTarget(html) }} />
    }
    { text &&
      <p>{text}</p>
    }
    { children }
  </Styled>
);
/* eslint-enable react/no-danger */

AsideContent.propTypes = {
  title: PropTypes.node,
  html: PropTypes.string,
  text: PropTypes.string,
  children: PropTypes.node,
};

export default AsideContent;
