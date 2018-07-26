import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { FlexibleWidthXYPlot, XAxis, YAxis, GridLines, AreaSeries, Hint } from 'react-vis';
  import { timeFormat } from 'd3-time-format';

import getLabel from 'utils/get-label';
import attributesEqual from 'utils/attributes-equal';

import CardTitle from 'components/CardTitle';
import Label from 'components/Label';
import ScreenReaderDataTable from 'components/ScreenReaderDataTable';

import Card from 'styles/Card';
import ScreenReaderOnly from 'styles/ScreenReaderOnly';

const HintInner = styled.div`
  background: red;
`;

class PlotFocusArea extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    const {
      focusArea,
      focusAreaIcon,
      surveyHighlightedId,
      surveys,
      subject,
      onHighlightSurvey,
      onFAMouseEnter,
      onFAMouseLeave,
      onFATouch,
      theme,
    } = this.props;

    const data = focusArea
      .get('outcomes')
      .filter((outcome) => attributesEqual(outcome.get('subject_id'), subject.get('subject_id')))
      .reduce((memo, outcome) => {
        const survey = surveys.find((item) => attributesEqual(outcome.get('survey_id'), item.get('survey_id')));
        return memo.concat([{
          x: new Date(survey.get('date')).getTime(),
          y: outcome.get('value'),
          column: survey.get('survey_id'),
          row: subject.get('subject_id'),
        }]);
      }, []);

    const hintValue = data.find((d) => attributesEqual(d.surveyID, surveyHighlightedId));

    const firstDate = new Date(surveys.first().get('date')).getTime();
    const lastDate = new Date(surveys.last().get('date')).getTime();

    // dummy data to force the area plot from 0 to 100%
    const dataYRange = [{ x: firstDate, y: 0 }, { x: firstDate, y: 100 }];
    const dataXYRange = [{ x: firstDate, y: 100 }, { x: lastDate, y: 100 }];

    return (
      <Card
        onMouseEnter={onFAMouseEnter}
        onMouseLeave={onFAMouseLeave}
        onTouchStart={onFATouch}
      >
        <ScreenReaderOnly>
          {getLabel('component.focus-areas.focus-area')}
        </ScreenReaderOnly>
        <CardTitle title={focusArea.get('title')} iconSrc={focusAreaIcon} />
        <ScreenReaderOnly>
          {focusArea.get('description')}
        </ScreenReaderOnly>
        <figure>
          <figcaption>
            <Label id="screenreader.focus-areas.chart-caption" />
          </figcaption>
          <ScreenReaderDataTable
            data={data}
            columns={Object.values(surveys.map((item) => ({
              id: item.get('survey_id'),
              label: timeFormat('%Y')(new Date(item.get('date')).getTime()),
            })).toJS())}
            rows={[{
              id: subject.get('subject_id'),
              label: subject.get('title'),
            }]}
            caption={getLabel('screenreader.focus-areas.chart-table-caption')}
          />
          <FlexibleWidthXYPlot
            height={160}
            xType="time"
            aria-hidden="true"
            role="presentation"
          >
            <AreaSeries data={dataXYRange} style={{ fill: '#F4F5F5', strokeWidth: 0 }} />
            <AreaSeries data={dataYRange} style={{ opacity: 0 }} />
            <GridLines
              direction="horizontal"
              attr="y"
              tickValues={[50]}
            />
            <AreaSeries
              data={data}
              style={{
                fill: theme.colors[focusArea.get('indicator_id')],
                strokeWidth: 0,
              }}
              onNearestX={(value) =>
                onHighlightSurvey(value.column)
              }
            />
            <XAxis
              tickValues={[firstDate, lastDate]}
              tickFormat={timeFormat('%Y')}
            />
            <YAxis
              tickValues={[50]}
              tickFormat={(value) => `${value}%`}
            />
            { hintValue &&
              <Hint
                value={hintValue}
                align={{ vertical: 'top', horizontal: 'left' }}
                style={{ transform: 'translateX(50%)' }}
              >
                <HintInner>
                  { `${hintValue.y}%` }
                </HintInner>
              </Hint>
            }
          </FlexibleWidthXYPlot>
        </figure>
      </Card>
    );
  }
}

PlotFocusArea.propTypes = {
  focusArea: PropTypes.object.isRequired,
  focusAreaIcon: PropTypes.string.isRequired,
  surveyHighlightedId: PropTypes.string.isRequired,
  surveys: PropTypes.object.isRequired,
  subject: PropTypes.object.isRequired,
  onHighlightSurvey: PropTypes.func.isRequired,
  onFAMouseEnter: PropTypes.func.isRequired,
  onFAMouseLeave: PropTypes.func.isRequired,
  onFATouch: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withTheme(PlotFocusArea);
