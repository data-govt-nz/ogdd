// vendor
import React from 'react';
import { Helmet } from 'react-helmet';
// utils
import getLabel from 'utils/get-label';
// components
import Label from 'components/Label';
// simple styles
import PageLongTitle from 'styles/PageLongTitle';
import ContentContainer from 'styles/ContentContainer';

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
          <title>{getLabel('component.notFound.title')}</title>
          <meta
            name="description"
            content={getLabel('component.notFound.metaDescription')}
          />
        </Helmet>
        <PageLongTitle id="pageTitle">
          <Label id="component.notFound.title" />
        </PageLongTitle>
        <p>
          <Label id="component.notFound.text" />
        </p>
      </ContentContainer>
    );
  }
}

export default PathNotFound;
