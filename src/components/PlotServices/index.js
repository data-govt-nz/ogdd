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
      .map((group) =>
        prepareData(group, this.props)
      );
    const keyItems = groups.map((group) => group.get(0).get('answer_text'));
    console.log(keyItems.toList().toJS())

    // set hint value from highlighted survey
    const hintValues = data.map((series) => series.find((d) => attributesEqual(d.column, surveyHighlightedId)));
    const hintValueRange = hintValues.reduce((memo, hintValue) =>
      [Math.min(hintValue.y, memo[0]), Math.max(hintValue.y, memo[1])]
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
                key={index}
                data={series}
                style={{
                  stroke: theme.colors.fa1,
                  strokeWidth: 2,
                  strokeDasharray: index === 0 ? 8 : 'none',
                }}
                onNearestX={(value) => index === 0 ? onHighlightSurvey(value.column) : false}
              />
            ))}
            { hintValues && hintValues.map((hintValue, index) => (
              <Hint
                key={index}
                value={hintValue}
                align={{
                  vertical: parseFloat(hintValue.y, 10) === parseFloat(hintValueRange[0]) ? 'bottom' : 'top',
                  horizontal: 'left',
                }}
                style={{ transform: 'translateX(50%)' }}
              >
                <PlotHint
                  background={'fa1'}
                  bottom={parseFloat(hintValue.y, 10) === parseFloat(hintValueRange[0])}
                >
                  { formatValue(hintValue.y, indicator.get('type')) }
                </PlotHint>
              </Hint>
            ))}
          </FlexibleWidthXYPlot>
          <Key>
            { keyItems.toList().map((item, index) => (
              <KeyEntry
                key={index}
                color="fa1"
                title={item}
              />
            ))}
          </Key>
        </CardBody>
      </Card>
    );
  }
//   <KeyEntry
//   key={index}
//   color="fa3"
//   title={group.get(0).toJS().answer_text}
//   />
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
