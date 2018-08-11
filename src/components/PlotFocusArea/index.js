// vendor
import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { Map, List } from 'immutable';
import {
  FlexibleWidthXYPlot,
  XAxis,
  YAxis,
  GridLines,
  AreaSeries,
  LineSeries,
  MarkSeries,
  Hint,
} from 'react-vis';
import { timeFormat } from 'd3-time-format';
// utils
import getLabel from 'utils/get-label';
import quasiEquals from 'utils/quasi-equals';
import formatValue from 'utils/format-value';
import prepareData from 'utils/prepare-plot-data-focus-area';
// components
import CardTitle from 'components/CardTitle';
import ScreenReaderWrapPlot from 'components/ScreenReaderWrapPlot';
import Card from 'components/Card';
// styles
import CardBody from 'styles/CardBody';
import CardHeader from 'styles/CardHeader';
import ScreenReaderOnly from 'styles/ScreenReaderOnly';
import PlotHint from 'styles/PlotHint';
import WrapPlot from 'styles/WrapPlot';

// component styles
const ReferenceHint = styled.div`
  position: absolute;
  bottom: 35px;
  left: 0;
  width: 100%;
  text-align: center;
  color: ${(props) => props.theme.colors.referenceLabel}
  font-size: ${(props) => props.theme.sizes[0]}
`;

/**
  * Overview timeseries area or line graph for single focus area, uses react-vis
  * When a refernce subject is present, subject plotted as line and reference is plotted as area
  * Otherwise single subject plotted as area
  * Card is either clickable or 'hoverable' depending on number of subjects
  *
  * @return {Component} Mixed timeseries graph for one or two subjects
  *
  */
class PlotFocusArea extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
    * Component constructor, sets initial state
    * @param {object} props component props
    */
  constructor(props) {
    super(props);
    this.state = { refHighlightedId: null };
  }
  /**
    * 'Highlight survey' handler - highlights survey in plot
    * @param {string} surveyHighlightedId the survey to highlight
    */
  onHighlightReference(refHighlightedId) {
    this.setState({ refHighlightedId: refHighlightedId || null });
  }

  render() {
    const {
      focusArea,
      focusAreaIcon,
      surveyHighlightedId,
      surveys,
      subject,
      referenceSubject,
      onHighlightSurvey,
      onFAMouseEnter,
      onFAMouseLeave,
      onFATouch,
      onFAClick,
      theme,
      onSelectReference,
    } = this.props;

    const { refHighlightedId } = this.state;

    // arrange data to be consumable for AreaSeries and ScreenReaderDataTable
    const data = prepareData(subject, focusArea, surveys);
    const referenceData = referenceSubject && prepareData(referenceSubject, focusArea, surveys);

    // set hint value from highlighted survey
    const hintValue = refHighlightedId && referenceData
      ? referenceData.find((d) => quasiEquals(d.column, surveyHighlightedId) && quasiEquals(d.row, refHighlightedId))
      : data.find((d) => quasiEquals(d.column, surveyHighlightedId));

    // axis ranges
    let xAxisRange = [
      new Date(surveys.first().get('date')).getTime(),
      new Date(surveys.last().get('date')).getTime(),
    ];

    const surveyHighlighted = surveys.find((item) => quasiEquals(item.get('survey_id'), surveyHighlightedId));
    if (surveyHighlighted && xAxisRange.indexOf(new Date(surveyHighlighted.get('date')).getTime()) < 0) {
      xAxisRange = xAxisRange.concat([new Date(surveyHighlighted.get('date')).getTime()]);
    }

    const yAxisRange = [0, 100];

    // dummy data to force the area plot from 0 to 100%
    const dataForceYRange = [{ x: xAxisRange[0], y: yAxisRange[0] }, { x: xAxisRange[0], y: yAxisRange[1] }];
    // dummy data to produce background
    const dataBackground = [{ x: xAxisRange[0], y: yAxisRange[1] }, { x: xAxisRange[1], y: yAxisRange[1] }];

    return (
      <Card
        onMouseEnter={onFAMouseEnter || (() => true)}
        onMouseLeave={onFAMouseLeave}
        onTouchStart={onFATouch}
        onClick={onFAClick}
        title={focusArea.get('title')}
      >
        <CardHeader>
          <ScreenReaderOnly>
            {getLabel('component.focus-areas.focus-area')}
          </ScreenReaderOnly>
          <CardTitle title={focusArea.get('title')} iconSrc={focusAreaIcon} />
          <ScreenReaderOnly>
            {focusArea.get('description')}
          </ScreenReaderOnly>
        </CardHeader>
        <CardBody>
          <ScreenReaderWrapPlot
            figCaption={getLabel('screenreader.focus-areas.chart-caption')}
            tableCaption={getLabel('screenreader.focus-areas.chart-table-caption')}
            tableData={{
              data: referenceSubject ? data.concat(referenceData) : data,
              columns: surveys.reduce((memo, item) => memo.concat([{
                id: item.get('survey_id'),
                label: timeFormat('%Y')(new Date(item.get('date')).getTime()),
              }]), []),
              rows: [{ id: subject.get('subject_id'), label: subject.get('title') }].concat(
                referenceSubject
                ? [{
                  id: referenceSubject.get('subject_id'),
                  label: `${referenceSubject.get('title')} ${getLabel('screenreader.focus-areas.chart-table-reference-hint')}`,
                }]
                : []
              ),
            }}
            formatValue={(datum) => formatValue(datum.y, focusArea.get('type'))}
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
                <AreaSeries data={dataBackground} style={{ fill: theme.colors.faPlotBackground, strokeWidth: 0 }} />
                <GridLines
                  direction="horizontal"
                  attr="y"
                  tickValues={[50]}
                />
                <XAxis
                  tickValues={xAxisRange}
                  tickFormat={timeFormat('%Y')}
                />
                <YAxis
                  tickValues={yAxisRange}
                  tickFormat={(value) => formatValue(value, focusArea.get('type'))}
                />
                <AreaSeries
                  data={referenceSubject ? referenceData : data}
                  style={{
                    fill: theme.colors[referenceSubject && !refHighlightedId ? 'faReference' : focusArea.get('indicator_id')],
                    strokeWidth: 0,
                    cursor: referenceSubject ? 'pointer' : 'inherit',
                  }}
                  onSeriesClick={({ event }) => {
                    if (referenceSubject) {
                      if (event) event.stopPropagation();
                      return onSelectReference(referenceSubject);
                    }
                    return false;
                  }}
                  onSeriesMouseOver={() => referenceSubject ? this.onHighlightReference(referenceSubject.get('subject_id')) : false}
                  onSeriesMouseOut={() => referenceSubject ? this.onHighlightReference(false) : false}
                  onNearestX={(value) => referenceSubject ? false : onHighlightSurvey(value.column)}
                />
                { referenceSubject && data.length > 1 &&
                  <LineSeries
                    data={data}
                    style={{
                      stroke: theme.colors[refHighlightedId ? 'faReference' : focusArea.get('indicator_id')],
                    }}
                    onNearestX={(value) => onHighlightSurvey(value.column)}
                  />
                }
                { referenceSubject && data.length === 1 &&
                  <MarkSeries
                    data={data}
                    size={3}
                    style={{
                      fill: theme.colors[focusArea.get('indicator_id')],
                      strokeWidth: 0,
                    }}
                    onNearestX={(value) => onHighlightSurvey(value.column)}
                  />
                }

                { hintValue &&
                  <Hint
                    value={hintValue}
                    align={{ vertical: 'top', horizontal: 'left' }}
                    style={{ transform: 'translateX(50%)' }}
                  >
                    <PlotHint background={focusArea.get('indicator_id')}>
                      { formatValue(hintValue.y, focusArea.get('type')) }
                    </PlotHint>
                  </Hint>
                }
              </FlexibleWidthXYPlot>
            </WrapPlot>
          </ScreenReaderWrapPlot>
          { referenceSubject && refHighlightedId === referenceSubject.get('subject_id') &&
            <ReferenceHint>
              {referenceSubject.get('title')}
            </ReferenceHint>
          }
        </CardBody>
      </Card>
    );
  }
}

PlotFocusArea.propTypes = {
  /** the focus area joined with outcomes */
  focusArea: PropTypes.instanceOf(Map).isRequired,
  /** highlighted survey id */
  surveyHighlightedId: PropTypes.string.isRequired,
  /** list of surveys */
  surveys: PropTypes.instanceOf(List).isRequired,
  /** the current subject */
  subject: PropTypes.instanceOf(Map).isRequired,
  /** the reference subject if other subject selected */
  referenceSubject: PropTypes.instanceOf(Map),
  /** highlight survey handler */
  onHighlightSurvey: PropTypes.func.isRequired,
  /** on mouse enter handler */
  onFAMouseEnter: PropTypes.func,
  /** on mouse leave handler */
  onFAMouseLeave: PropTypes.func,
  /** on touch handler */
  onFATouch: PropTypes.func,
  /** on click handler */
  onFAClick: PropTypes.func,
  /** on reference subject select handler */
  onSelectReference: PropTypes.func.isRequired,
  /** focus area icon */
  focusAreaIcon: PropTypes.string.isRequired,
  /** global theme */
  theme: PropTypes.object.isRequired,
};

export default withTheme(PlotFocusArea);
