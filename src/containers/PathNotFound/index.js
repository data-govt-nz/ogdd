// vendor
import React from 'react';
import { Helmet } from 'react-helmet';
// utils
import getLabel from 'utils/get-label';
// components
import Label from 'components/Label';
// simple styles
import PageLongTitle from 'styles/PageLongTitle';
import PageContainer from 'styles/PageContainer';

/**
  * Simple path not found component.
  * Not actually a container (not connected to redux store).
  *
  * @author [tmfrnz](https://github.com/tmfrnz)
  */
class PathNotFound extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <PageContainer>
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
      </PageContainer>
    );
  }
}

export default PathNotFound;
