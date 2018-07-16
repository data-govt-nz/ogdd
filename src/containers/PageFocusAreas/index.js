import React from 'react';
import { Helmet } from 'react-helmet';
import { FlexibleWidthXYPlot, XAxis, YAxis, GridLines, AreaSeries } from 'react-vis';
import Row from 'styles/Row';
import Column from 'styles/Column';
import getLabel from 'utils/get-label';
import { timeFormat } from 'd3-time-format';

import Label from 'components/Label';

class PageFocusAreas extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const key = 'focus-areas';
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
        <Row>
          <Column width={[1, 1 / 2, 1 / 3]} >
            <FlexibleWidthXYPlot
              height={300}
              xType="time"
            >
              <GridLines
                direction="horizontal"
                attr="y"
              />
              <AreaSeries
                data={[
                  { x: new Date('May 23 2017').getTime(), y: 10 },
                  { x: new Date('May 23 2018').getTime(), y: 15 },
                ]}
              />
              <AreaSeries
                data={[
                  { x: new Date('May 23 2017').getTime(), y: 0 },
                ]}
                style={{
                  opacity: 0,
                }}
              />
              <XAxis
                tickValues={[
                  new Date('May 23 2017').getTime(),
                  new Date('May 23 2018').getTime(),
                ]}
                tickFormat={timeFormat('%Y')}
              />
              <YAxis
                tickValues={[
                  0,
                  15,
                ]}
              />
            </FlexibleWidthXYPlot>
          </Column>
        </Row>
      </div>
    );
  }
}

export default PageFocusAreas;
