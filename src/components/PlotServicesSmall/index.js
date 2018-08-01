import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import {
  FlexibleWidthXYPlot,
  XAxis,
  YAxis,
  GridLines,
  AreaSeries,
  Hint,
} from 'react-vis';
import { timeFormat } from 'd3-time-format';

import getLabel from 'utils/get-label';
import attributesEqual from 'utils/attributes-equal';
import formatValue from 'utils/format-value';

import ScreenReaderWrapPlot from 'components/ScreenReaderWrapPlot';

import PlotHint from 'styles/PlotHint';
import WrapPlot from 'styles/WrapPlot';

const Styled = styled.div`
  padding: 0 15px 30px;
`;

const Caption = styled.div`
  text-align: center;
  padding-left: 40px;
  padding-right: 40px;
`;

const prepareData = (outcomes, { surveys }) =>
  outcomes
    .reduce((memo, outcome) => {
      const survey = surveys.find((item) => attributesEqual(outcome.get('survey_id'), item.get('survey_id')));
      // AreaSeries requires x and y coordinates, ScreenReaderDataTable requires column and row identifiers
      return survey
        ? memo.concat([{
          x: new Date(survey.get('date')).getTime(),
          y: outcome.get('value'),
          column: survey.get('survey_id'),
          row: outcome.get('answer'),
        }])
        : memo;
    }, [])
;

class PlotServicesSmall extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      outcomes,
      surveyHighlightedId,
      surveys,
      onHighlightSurvey,
      indicatorType,
      theme,
    } = this.props;

    // arrange data to be consumable for AreaSeries and ScreenReaderDataTable
    const data = prepareData(outcomes, this.props);

    //
    //
    // // set hint value from highlighted survey
    const hintValue = data.find((d) => attributesEqual(d.column, surveyHighlightedId));
    //
    // axis ranges
    let xAxisRange = [
      new Date(surveys.first().get('date')).getTime(),
      new Date(surveys.last().get('date')).getTime(),
    ];
    const surveyHighlighted = surveys.find((item) => attributesEqual(item.get('survey_id'), surveyHighlightedId));
    if (surveyHighlighted && xAxisRange.indexOf(new Date(surveyHighlighted.get('date')).getTime()) < 0) {
      xAxisRange = xAxisRange.concat(new Date(surveyHighlighted.get('date')).getTime());
    }

    const yAxisRange = [0, 100];

    // dummy data to force the area plot from 0 to 100%
    const dataForceYRange = [{ x: xAxisRange[0], y: yAxisRange[0] }, { x: xAxisRange[0], y: yAxisRange[1] }];

    return (
      <Styled>
        <ScreenReaderWrapPlot
          figCaption={outcomes.first().get('answer_text')}
          tableCaption={getLabel('screenreader.services.chart-table-caption')}
          tableData={{
            data,
            columns: surveys.reduce((memo, item) => memo.concat([{
              id: item.get('survey_id'),
              label: timeFormat('%Y')(new Date(item.get('date')).getTime()),
            }]), []),
            rows: [{
              id: outcomes.first().get('answer'),
              label: outcomes.first().get('answer_text'),
            }],
          }}
          formatValue={(datum) => formatValue(datum.y, indicatorType)}
        >
          <WrapPlot>
            <FlexibleWidthXYPlot
              height={160}
              xType="time"
              onMouseLeave={() => {
                onHighlightSurvey(surveys.last().get('survey_id'));
              }}
            >
              <AreaSeries data={dataForceYRange} style={{ opacity: 0 }} />
              <GridLines
                direction="horizontal"
                attr="y"
                tickValues={[0, 50, 100]}
              />
              <XAxis
                tickValues={xAxisRange}
                tickFormat={timeFormat('%Y')}
              />
              <YAxis
                tickValues={yAxisRange}
                tickFormat={(value) => formatValue(value, indicatorType)}
              />
              <AreaSeries
                data={data}
                style={{
                  fill: theme.colors.fa1,
                  strokeWidth: 0,
                }}
                onNearestX={(value) => onHighlightSurvey(value.column)}
              />
              { hintValue &&
                <Hint
                  value={hintValue}
                  align={{ vertical: 'top', horizontal: 'left' }}
                  style={{ transform: 'translateX(50%)' }}
                >
                  <PlotHint background={'fa1'}>
                    { formatValue(hintValue.y, indicatorType) }
                  </PlotHint>
                </Hint>
              }
            </FlexibleWidthXYPlot>
          </WrapPlot>
          <Caption>
            {outcomes.first().get('answer_text')}
          </Caption>
        </ScreenReaderWrapPlot>
      </Styled>
    );
  }
}

PlotServicesSmall.propTypes = {
  outcomes: PropTypes.object.isRequired,
  surveyHighlightedId: PropTypes.string.isRequired,
  surveys: PropTypes.object.isRequired,
  onHighlightSurvey: PropTypes.func.isRequired,
  indicatorType: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withTheme(PlotServicesSmall);
