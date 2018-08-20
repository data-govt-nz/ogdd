// vendor
import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { Map, List } from 'immutable';
import {
  FlexibleWidthXYPlot,
  XAxis,
  YAxis,
  AreaSeries,
  LineSeries,
  MarkSeries,
  Hint,
} from 'react-vis';
import { timeFormat } from 'd3-time-format';
// utils
import getLabel from 'utils/get-label';
import quasiEquals from 'utils/quasi-equals';
import preparePlotData from 'utils/prepare-plot-data';
import formatValue from 'utils/format-value';
// constants
import { DEFAULT_SUBJECT_ID } from 'containers/App/constants';
// components
import ScreenReaderWrapPlot from 'components/ScreenReaderWrapPlot';
import KeyEntry from 'components/KeyEntry';
import Card from 'components/Card';
// styles
import CardBody from 'styles/CardBody';
import PlotHint from 'styles/PlotHint';
import Key from 'styles/Key';
import WrapPlot from 'styles/WrapPlot';

/**
  * Principal timeseries line graph for services indicators, uses react-vis
  * Creates dot/mark graph if data is only present for 1 survey
  *
  * @return {Component} Timeseries line graph for two variables
  *
  */
class PlotServices extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      indicator,
      surveyHighlightedId,
      surveys,
      onHighlightSurvey,
      onCardMouseLeave,
      theme,
    } = this.props;
    // arrange data to be consumable for AreaSeries and ScreenReaderDataTable
    const groups = indicator
      .get('outcomes')
      .filter((outcome) => quasiEquals(outcome.get('subject_id'), DEFAULT_SUBJECT_ID))
      .groupBy((outcome) => outcome.get('answer'));

    const data = groups
      .toList()
      .reduce((memo, group) => memo.concat({
        data: preparePlotData(group, surveys),
        title: group.first().get('answer_text'),
        id: group.first().get('answer'),
      }), []);

    // const keyItems = groups.reduce((memo, group) => memo.concat({
    //   title: group.first().get('answer_text'),
    //   id: group.first().get('answer'),
    // }), []);

    // set hint value from highlighted survey
    const hintValues = data.reduce((memo, series) => memo.concat([{
      value: series.data.find((d) => quasiEquals(d.column, surveyHighlightedId)),
      id: series.id,
    }]), []);

    const hintValueRange = hintValues.reduce((memo, hintValue) =>
      [Math.min(hintValue.value.y, memo[0]), Math.max(hintValue.value.y, memo[1])]
    , [100, 0]);

    // axis ranges
    let xAxisRange = [
      new Date(surveys.first().get('date')).getTime(),
      new Date(surveys.last().get('date')).getTime(),
    ];
    const surveyHighlighted = surveys.find((item) => quasiEquals(item.get('survey_id'), surveyHighlightedId));
    if (surveyHighlighted && xAxisRange.indexOf(new Date(surveyHighlighted.get('date')).getTime()) < 0) {
      xAxisRange = xAxisRange.concat(new Date(surveyHighlighted.get('date')).getTime());
    }
    const yAxisRange = [0, 100];

    // dummy data to force the area plot from 0
    const dataForceYRange = [{ x: xAxisRange[0], y: yAxisRange[0] }, { x: xAxisRange[0], y: yAxisRange[1] }];

    return (
      <Card
        onMouseLeave={onCardMouseLeave}
      >
        <CardBody withoutTitle>
          <ScreenReaderWrapPlot
            figCaption={getLabel('screenreader.services.chart-caption')}
            tableCaption={getLabel('screenreader.services.chart-table-caption')}
            tableData={{
              data: data.reduce((memo, series) => memo.concat(series.data), []),
              columns: surveys.reduce((memo, item) => memo.concat([{
                id: item.get('survey_id'),
                label: timeFormat('%Y')(new Date(item.get('date')).getTime()),
              }]), []),
              rows: groups.reduce((memo, item) => memo.concat([
                { id: item.first().get('answer'), label: item.first().get('answer_text') },
              ]), []),
            }}
            formatValue={(datum) => formatValue(datum.y, indicator.get('type'))}
          >
            <WrapPlot>
              <FlexibleWidthXYPlot
                height={240}
                xType="time"
                onMouseLeave={() => {
                  onHighlightSurvey(surveys.last().get('survey_id'));
                }}
                margin={{ bottom: 30, right: 13 }}
              >
                <AreaSeries data={dataForceYRange} style={{ opacity: 0 }} />
                <XAxis
                  tickValues={xAxisRange}
                  tickFormat={timeFormat('%Y')}
                  style={{
                    ticks: { strokeWidth: 0 },
                  }}
                  tickPadding={2}
                />
                <YAxis
                  tickFormat={(value) => formatValue(value, indicator.get('type'))}
                  style={{
                    strokeWidth: 0,
                    ticks: { strokeWidth: 1 },
                  }}
                  tickSize={3}
                  tickPadding={2}
                />
                { data && data.map((series, index) => series.data.length > 1
                  ? (
                    <LineSeries
                      key={series.id}
                      data={series.data}
                      style={{
                        stroke: theme.colors.fa1,
                        strokeWidth: 2,
                        strokeDasharray: index === 0 ? 8 : 'none',
                      }}
                      onNearestX={(value) => index === 0 ? onHighlightSurvey(value.column) : false}
                    />
                  )
                  : (
                    <MarkSeries
                      key={series.id}
                      data={series.data}
                      size={3}
                      style={{
                        fill: index === 0 ? theme.colors.fa1 : 'none',
                        strokeWidth: index === 0 ? 0 : 1,
                      }}
                    />
                  )
                )}
                { hintValues && hintValues.map((hintValue) => (
                  <Hint
                    key={hintValue.id}
                    value={hintValue.value}
                    align={{
                      vertical: parseFloat(hintValue.value.y, 10) === parseFloat(hintValueRange[0]) ? 'bottom' : 'top',
                      horizontal: 'left',
                    }}
                    style={{ transform: 'translateX(50%)' }}
                  >
                    <PlotHint
                      background={'fa1'}
                      bottom={parseFloat(hintValue.value.y, 10) === parseFloat(hintValueRange[0])}
                    >
                      { formatValue(hintValue.value.y, indicator.get('type')) }
                    </PlotHint>
                  </Hint>
                ))}
              </FlexibleWidthXYPlot>
            </WrapPlot>
            <Key>
              { data.map((series, index) => series.data.length > 1
                ? (
                  <KeyEntry
                    key={series.id}
                    color="fa1"
                    title={series.title}
                    dashed={index === 0}
                    line
                    small
                  />
                )
                : (
                  <KeyEntry
                    key={series.id}
                    color="fa1"
                    title={series.title}
                    outline={index !== 0}
                    small
                  />
                )
              )}
            </Key>
          </ScreenReaderWrapPlot>
        </CardBody>
      </Card>
    );
  }
}

PlotServices.propTypes = {
  /** the indicator */
  indicator: PropTypes.instanceOf(Map).isRequired,
  /** currently highlighted survey */
  surveyHighlightedId: PropTypes.string.isRequired,
  /** all surveys */
  surveys: PropTypes.instanceOf(List).isRequired,
  /** survey highlight handler */
  onHighlightSurvey: PropTypes.func.isRequired,
  /** mouse leave handler */
  onCardMouseLeave: PropTypes.func.isRequired,
  /** global theme */
  theme: PropTypes.object.isRequired,
};

export default withTheme(PlotServices);
