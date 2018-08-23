// vendor
import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

// utils
import getLabel from 'utils/get-label';
import getPageMetaTitle from 'utils/get-page-meta-title';
// components
import Label from 'components/Label';
// simple styles
import PageLongTitle from 'styles/PageLongTitle';
import ContentContainer from 'styles/ContentContainer';

const StyledP = styled.p`
  font-size: 16px;
`;

/**
  * Simple path not found component.
  * Not actually a container (not connected to redux store).
  *
  */
class PathNotFound extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <ContentContainer>
        <Helmet>
          <title>{getPageMetaTitle('component.notFound.title')}</title>
          <meta
            name="description"
            content={getLabel('component.notFound.metaDescription')}
          />
        </Helmet>
        <PageLongTitle id="pageTitle">
          <Label id="component.notFound.title" />
        </PageLongTitle>
        <StyledP>
          <Label id="component.notFound.text" />
        </StyledP>
      </ContentContainer>
    );
  }
}

export default PathNotFound;
