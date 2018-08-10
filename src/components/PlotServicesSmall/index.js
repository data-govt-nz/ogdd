/**
  * Small timeseries area plot for one variable
  * Used for 3rd services indicator, uses react-vis
  *
  * @return {Component} Small area plot for one variable
  * @author [tmfrnz](https://github.com/tmfrnz)
  */
// vendor
import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { List } from 'immutable';
import {
  FlexibleWidthXYPlot,
  XAxis,
  YAxis,
  GridLines,
  AreaSeries,
  MarkSeries,
  Hint,
} from 'react-vis';
import { timeFormat } from 'd3-time-format';
// utils
import getLabel from 'utils/get-label';
import quasiEquals from 'utils/quasi-equals';
import preparePlotData from 'utils/prepare-plot-data';
import formatValue from 'utils/format-value';
// components
import ScreenReaderWrapPlot from 'components/ScreenReaderWrapPlot';
// styles
import PlotHint from 'styles/PlotHint';
import WrapPlot from 'styles/WrapPlot';

// component styles
const Styled = styled.div`
  padding: 0 15px 30px;
`;
const Caption = styled.div`
  text-align: center;
  padding-left: 40px;
  padding-right: 40px;
`;

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
    const data = preparePlotData(outcomes, surveys);

    // set hint value from highlighted survey
    const hintValue = data.find((d) => quasiEquals(d.column, surveyHighlightedId));

    // axis ranges
    let xAxisRange = [
      new Date(surveys.first().get('date')).getTime(),
      new Date(surveys.last().get('date')).getTime(),
    ];

    // the highlighted survey
    const surveyHighlighted = surveys.find((item) => quasiEquals(item.get('survey_id'), surveyHighlightedId));
    if (surveyHighlighted && xAxisRange.indexOf(new Date(surveyHighlighted.get('date')).getTime()) < 0) {
      xAxisRange = xAxisRange.concat(new Date(surveyHighlighted.get('date')).getTime());
    }

    // full y range 0-100%
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
              { data.length > 1
                ? (
                  <AreaSeries
                    data={data}
                    style={{
                      fill: theme.colors.fa1,
                      strokeWidth: 0,
                    }}
                    onNearestX={(value) => onHighlightSurvey(value.column)}
                  />
                )
                : (
                  <MarkSeries
                    data={data}
                    size={3}
                    style={{
                      fill: theme.colors.fa1,
                      strokeWidth: 0,
                    }}
                  />
                )
              }
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
  /** data points */
  outcomes: PropTypes.instanceOf(List).isRequired,
  /** currently highlighted survey */
  surveyHighlightedId: PropTypes.string.isRequired,
  /** all surveys */
  surveys: PropTypes.instanceOf(List).isRequired,
  /** survey highlight handler */
  onHighlightSurvey: PropTypes.func.isRequired,
  /** type of indicator */
  indicatorType: PropTypes.string.isRequired,
  /** the global app theme */
  theme: PropTypes.object.isRequired,
};

export default withTheme(PlotServicesSmall);
