/**
  * Description
  *
  * @author [tmfrnz](https://github.com/tmfrnz)
  */
import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { Map, List } from 'immutable';

import {
  FlexibleWidthXYPlot,
  XAxis,
  YAxis,
  AreaSeries,
  Hint,
} from 'react-vis';
import { timeFormat } from 'd3-time-format';

import getLabel from 'utils/get-label';
import quasiEquals from 'utils/quasi-equals';
import formatValue from 'utils/format-value';
import { DEFAULT_SUBJECT_ID } from 'containers/App/constants';
import ScreenReaderWrapPlot from 'components/ScreenReaderWrapPlot';
import KeyEntry from 'components/KeyEntry';

import Key from 'styles/Key';
import Card from 'components/Card';
import CardBody from 'styles/CardBody';
import PlotHint from 'styles/PlotHint';
import WrapPlot from 'styles/WrapPlot';

const getYAxisMax = (yMax) => {
  const order = Math.floor((Math.log(yMax) / Math.LN10) + 0.000000001);
  const factor = 10 ** order;
  // axis should have a relative buffer of 2+
  return ((2 * Math.ceil(Math.floor(yMax / factor) / 2)) + 2) * factor;
};

const prepareData = (indicator, { surveys }) =>
  indicator
    .get('outcomes') // we are shoing outcomes
    .filter((outcome) => quasiEquals(outcome.get('subject_id'), DEFAULT_SUBJECT_ID)) // for the current subject
    .reduce((memo, outcome) => {
      const survey = surveys.find((item) => quasiEquals(outcome.get('survey_id'), item.get('survey_id')));
      // AreaSeries requires x and y coordinates, ScreenReaderDataTable requires column and row identifiers
      return survey
        ? memo.concat([{
          x: new Date(survey.get('date')).getTime(),
          y: outcome.get('value'),
          column: survey.get('survey_id'),
          row: indicator.get('indicator_id'),
        }])
        : memo;
    }, [])
;

class PlotAssets extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      indicator,
      referenceIndicator,
      surveyHighlightedId,
      surveys,
      onHighlightSurvey,
      onCardMouseLeave,
      theme,
    } = this.props;
    // arrange data to be consumable for AreaSeries and ScreenReaderDataTable
    const data = prepareData(indicator, this.props);
    const referenceData = prepareData(referenceIndicator, this.props);

    // set hint value from highlighted survey
    const hintValue = data.find((d) => quasiEquals(d.column, surveyHighlightedId));
    const hintReferenceValue = referenceData.find((d) => quasiEquals(d.column, surveyHighlightedId));

    // axis ranges
    let xAxisRange = [
      new Date(surveys.first().get('date')).getTime(),
      new Date(surveys.last().get('date')).getTime(),
    ];
    const surveyHighlighted = surveys.find((item) => quasiEquals(item.get('survey_id'), surveyHighlightedId));
    if (surveyHighlighted && xAxisRange.indexOf(new Date(surveyHighlighted.get('date')).getTime()) < 0) {
      xAxisRange = xAxisRange.concat(new Date(surveyHighlighted.get('date')).getTime());
    }
    const yAxisRange = [0, getYAxisMax(Math.max(...data.concat(referenceData).map((d) => d.y)))];

    // dummy data to force the area plot from 0
    const dataForceYRange = [{ x: xAxisRange[0], y: yAxisRange[0] }, { x: xAxisRange[0], y: yAxisRange[1] }];

    return (
      <Card
        onMouseLeave={onCardMouseLeave}
      >
        <CardBody withoutTitle>
          <ScreenReaderWrapPlot
            figCaption={getLabel('screenreader.assets.chart-caption')}
            tableCaption={getLabel('screenreader.assets.chart-table-caption')}
            tableData={{
              data: data.concat(referenceData),
              columns: surveys.reduce((memo, item) => memo.concat([{
                id: item.get('survey_id'),
                label: timeFormat('%Y')(new Date(item.get('date')).getTime()),
              }]), []),
              rows: [
                { id: indicator.get('indicator_id'), label: indicator.get('title') },
                { id: referenceIndicator.get('indicator_id'), label: referenceIndicator.get('title') },
              ],
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
              >
                <AreaSeries data={dataForceYRange} style={{ opacity: 0 }} />
                <XAxis
                  tickValues={xAxisRange}
                  tickFormat={timeFormat('%Y')}
                />
                <YAxis
                  tickFormat={(value) => formatValue(value, indicator.get('type'), yAxisRange[1] > 10000)}
                />
                <AreaSeries
                  data={referenceData}
                  style={{
                    fill: theme.colors.assetReference,
                    strokeWidth: 0,
                  }}
                />
                <AreaSeries
                  data={data}
                  style={{
                    fill: theme.colors.fa3,
                    strokeWidth: 0,
                  }}
                  onNearestX={(value) => onHighlightSurvey(value.column)}
                />
                { hintValue &&
                  <Hint
                    value={hintValue}
                    align={{ vertical: 'bottom', horizontal: 'left' }}
                    style={{ transform: 'translateX(50%)' }}
                  >
                    <PlotHint background={'fa3'} bottom>
                      { formatValue(hintValue.y, indicator.get('type')) }
                    </PlotHint>
                  </Hint>
                }
                { hintReferenceValue &&
                  <Hint
                    value={hintReferenceValue}
                    align={{ vertical: 'top', horizontal: 'left' }}
                    style={{ transform: 'translateX(50%)' }}
                  >
                    <PlotHint background={'assetReferenceHint'}>
                      { formatValue(hintReferenceValue.y, indicator.get('type')) }
                    </PlotHint>
                  </Hint>
                }
              </FlexibleWidthXYPlot>
            </WrapPlot>
            <Key>
              <KeyEntry color="fa3" title={indicator.get('title')} />
              <KeyEntry color="assetReference" title={referenceIndicator.get('title')} />
            </Key>
          </ScreenReaderWrapPlot>
        </CardBody>
      </Card>
    );
  }
}

PlotAssets.propTypes = {
  indicator: PropTypes.instanceOf(Map).isRequired,
  referenceIndicator: PropTypes.instanceOf(Map).isRequired,
  surveys: PropTypes.instanceOf(List).isRequired,
  surveyHighlightedId: PropTypes.string.isRequired,
  onHighlightSurvey: PropTypes.func.isRequired,
  onCardMouseLeave: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withTheme(PlotAssets);
