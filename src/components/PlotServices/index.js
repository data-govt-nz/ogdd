import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import {
  FlexibleWidthXYPlot,
  XAxis,
  YAxis,
  AreaSeries,
  LineSeries,
  Hint,
} from 'react-vis';
import { timeFormat } from 'd3-time-format';

import getLabel from 'utils/get-label';
import attributesEqual from 'utils/attributes-equal';
import formatValue from 'utils/format-value';
import { DEFAULT_SUBJECT_ID } from 'containers/App/constants';
import ScreenReaderWrapPlot from 'components/ScreenReaderWrapPlot';

import Card from 'styles/Card';
import CardBody from 'styles/CardBody';
import PlotHint from 'styles/PlotHint';
import Key from 'styles/Key';
import KeyEntry from 'components/KeyEntry';

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
      .filter((outcome) => attributesEqual(outcome.get('subject_id'), DEFAULT_SUBJECT_ID))
      .groupBy((outcome) => outcome.get('answer'));

    const data = groups
      .toList()
      .reduce((memo, group) => memo.concat({
        data: prepareData(group, this.props),
        id: group.first().get('answer'),
      }), []);

    const keyItems = groups.reduce((memo, group) => memo.concat({
      title: group.first().get('answer_text'),
      id: group.first().get('answer'),
    }), []);

    // set hint value from highlighted survey
    const hintValues = data.reduce((memo, series) => memo.concat([{
      value: series.data.find((d) => attributesEqual(d.column, surveyHighlightedId)),
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
    const surveyHighlighted = surveys.find((item) => attributesEqual(item.get('survey_id'), surveyHighlightedId));
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
            <FlexibleWidthXYPlot
              height={240}
              xType="time"
            >
              <AreaSeries data={dataForceYRange} style={{ opacity: 0 }} />
              <XAxis
                tickValues={xAxisRange}
                tickFormat={timeFormat('%Y')}
              />
              <YAxis
                tickFormat={(value) => formatValue(value, indicator.get('type'))}
              />
              { data && data.map((series, index) => (
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
              ))}
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
            <Key>
              { keyItems.map((item, index) => (
                <KeyEntry
                  key={item.id}
                  color="fa1"
                  title={item.title}
                  dashed={index === 0}
                  line
                />
              ))}
            </Key>
          </ScreenReaderWrapPlot>
        </CardBody>
      </Card>
    );
  }
}

PlotServices.propTypes = {
  indicator: PropTypes.object.isRequired,
  surveyHighlightedId: PropTypes.string.isRequired,
  surveys: PropTypes.object.isRequired,
  onHighlightSurvey: PropTypes.func.isRequired,
  onCardMouseLeave: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withTheme(PlotServices);
