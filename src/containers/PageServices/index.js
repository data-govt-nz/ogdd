import React from 'react';
import { Helmet } from 'react-helmet';

import getLabel from 'utils/get-label';
import Row from 'styles/Row';
import Column from 'styles/Column';

import Label from 'components/Label';

class PageServices extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const key = 'services';
    return (
      <div>
        <Helmet>
          <title>{getLabel(`component.${key}.title`)}</title>
          <meta
            name="description"
            content={getLabel(`component.${key}.metaDescription`)}
          />
        </Helmet>
        <h2 id="pageTitle">
          <Label id={`component.${key}.title`} />
        </h2>
        <Column>
          <Row>
            <Column width={[1, 1 / 2, 1 / 3]}>
            </Column>
          </Row>
        </Column>
      </div>
    );
  }
}

export default PageServices;
