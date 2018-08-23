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
  Hint,
} from 'react-vis';
import { timeFormat } from 'd3-time-format';
// utils
import getLabel from 'utils/get-label';
import quasiEquals from 'utils/quasi-equals';
import formatValue from 'utils/format-value';
// components
import ScreenReaderWrapPlot from 'components/ScreenReaderWrapPlot';
import KeyEntry from 'components/KeyEntry';
// styles
import Key from 'styles/Key';
import Card from 'components/Card';
import CardBody from 'styles/CardBody';
import PlotHint from 'styles/PlotHint';
import WrapPlot from 'styles/WrapPlot';

// component utils
import prepareData from './prepare-data';
import getYAxisMax from './get-y-axis-max';

/**
  * Produces a timeseries area graph with 2 indicators using react-vis.
  * Graph shows principal indicator and a reference indicator for comparison in the background and
  * thus assuming that the principal indicator is a subset of the reference indicator
  * (Used for Data Assets Chart component)
  *
  * @return {Component} Timeseries area graph for primary and reference variables
  *
  */
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
    const data = prepareData(indicator, surveys);
    const referenceData = prepareData(referenceIndicator, surveys);

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
                  tickFormat={(value) => formatValue(value, indicator.get('type'), yAxisRange[1] > 10000)}
                  style={{
                    strokeWidth: 0,
                    ticks: { strokeWidth: 1 },
                  }}
                  tickSize={3}
                  tickPadding={2}
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
                    style={{ transform: 'translateX(50%)', WebkitTransform: 'translateX(50%)', MsTransform: 'translateX(50%)' }}
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
                    style={{ transform: 'translateX(50%)', WebkitTransform: 'translateX(50%)', MsTransform: 'translateX(50%)' }}
                  >
                    <PlotHint background={'assetReferenceHint'}>
                      { formatValue(hintReferenceValue.y, indicator.get('type')) }
                    </PlotHint>
                  </Hint>
                }
              </FlexibleWidthXYPlot>
            </WrapPlot>
            <Key>
              <KeyEntry themeColor="fa3" title={indicator.get('title')} area small />
              <KeyEntry themeColor="assetReference" title={referenceIndicator.get('title')} area small />
            </Key>
          </ScreenReaderWrapPlot>
        </CardBody>
      </Card>
    );
  }
}

PlotAssets.propTypes = {
  /** the indicator joined with outcomes */
  indicator: PropTypes.instanceOf(Map).isRequired,
  /** the reference indicator joined with outcomes */
  referenceIndicator: PropTypes.instanceOf(Map).isRequired,
  /** list of surveys */
  surveys: PropTypes.instanceOf(List).isRequired,
  /** highlighted survey id */
  surveyHighlightedId: PropTypes.string.isRequired,
  /** highlight survey handler */
  onHighlightSurvey: PropTypes.func.isRequired,
  /** on mouse leave handler */
  onCardMouseLeave: PropTypes.func.isRequired,
  /** global theme */
  theme: PropTypes.object.isRequired,
};

export default withTheme(PlotAssets);
