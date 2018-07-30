import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
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

import getLabel from 'utils/get-label';
import attributesEqual from 'utils/attributes-equal';
import formatValue from 'utils/format-value';

import CardTitle from 'components/CardTitle';
import ScreenReaderWrapPlot from 'components/ScreenReaderWrapPlot';

import Card from 'styles/Card';
import CardBody from 'styles/CardBody';
import CardHeader from 'styles/CardHeader';
import ScreenReaderOnly from 'styles/ScreenReaderOnly';
import PlotHint from 'styles/PlotHint';
import WrapPlot from 'styles/WrapPlot';

const prepareData = (subject, { focusArea, surveys }) =>
  focusArea
    .get('outcomes') // we are shoing outcomes
    .filter((outcome) => attributesEqual(outcome.get('subject_id'), subject.get('subject_id'))) // for the current subject
    .reduce((memo, outcome) => {
      const survey = surveys.find((item) => attributesEqual(outcome.get('survey_id'), item.get('survey_id')));
      // AreaSeries requires x and y coordinates, ScreenReaderDataTable requires column and row identifiers
      return survey
        ? memo.concat([{
          x: new Date(survey.get('date')).getTime(),
          y: outcome.get('value'),
          column: survey.get('survey_id'),
          row: subject.get('subject_id'),
        }])
        : memo;
    }, [])
;

class PlotFocusArea extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = { refHighlightedId: null };
  }

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
      theme,
      onSelectReference,
    } = this.props;

    const { refHighlightedId } = this.state;

    // arrange data to be consumable for AreaSeries and ScreenReaderDataTable
    const data = prepareData(subject, this.props);

    const referenceData = referenceSubject && prepareData(referenceSubject, this.props);

    // set hint value from highlighted survey

    const hintValue = refHighlightedId
      ? referenceData.find((d) => attributesEqual(d.column, surveyHighlightedId) && attributesEqual(d.row, refHighlightedId))
      : data.find((d) => attributesEqual(d.column, surveyHighlightedId));

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
    // dummy data to produce background
    const dataBackground = [{ x: xAxisRange[0], y: yAxisRange[1] }, { x: xAxisRange[1], y: yAxisRange[1] }];

    return (
      <Card
        onMouseEnter={onFAMouseEnter}
        onMouseLeave={onFAMouseLeave}
        onTouchStart={onFATouch}
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
                    cursor: referenceSubject ? 'pointer' : 'auto',
                  }}
                  onSeriesClick={() => referenceSubject ? onSelectReference(referenceSubject) : false}
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
                { refHighlightedId &&
                  <PlotHint color="referenceLabel" secondary>
                    { referenceSubject.get('title') }
                  </PlotHint>
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
        </CardBody>
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
  referenceSubject: PropTypes.object,
  onHighlightSurvey: PropTypes.func.isRequired,
  onFAMouseEnter: PropTypes.func.isRequired,
  onFAMouseLeave: PropTypes.func.isRequired,
  onFATouch: PropTypes.func.isRequired,
  onSelectReference: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withTheme(PlotFocusArea);
