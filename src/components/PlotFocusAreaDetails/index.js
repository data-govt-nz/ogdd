// vendor
import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { Map, List } from 'immutable';
import {
  FlexibleWidthXYPlot,
  XAxis,
  YAxis,
  AreaSeries,
  LineSeries,
  LineMarkSeries,
  MarkSeries,
  Hint,
} from 'react-vis';
import { timeFormat } from 'd3-time-format';
// utils
import quasiEquals from 'utils/quasi-equals';
import formatValue from 'utils/format-value';
import getLabel from 'utils/get-label';
import prepareData from 'utils/prepare-plot-data-focus-area';
// components
import ScreenReaderWrapPlot from 'components/ScreenReaderWrapPlot';
import KeyEntry from 'components/KeyEntry';
import CardTitle from 'components/CardTitle';
import Close from 'components/Close';
import Card from 'components/Card';

// styles
import Key from 'styles/Key';
import CardHeader from 'styles/CardHeader';
import CardBody from 'styles/CardBody';
import PlotHint from 'styles/PlotHint';
import ScreenReaderOnly from 'styles/ScreenReaderOnly';

// component styles
const PlotHintLabel = styled.div`
  color: ${(props) => props.reference
    ? props.theme.colors.dark
    : props.theme.colors.black
  };
  left: 5px;
  top: -7px;
  width: 70px;
  position: absolute;
  font-size: ${(props) => props.theme.sizes[0]};
  @media (min-width: ${(props) => props.theme.breakpoints[0]}) {
    width: 110px;
    left: 10px;
  }
`;
const WrapPlot = styled.div`
  padding-left: 0px;
  padding-right: 80px;
  @media (min-width: ${(props) => props.theme.breakpoints[0]}) {
    padding-left: 100px;
    padding-right: 130px;
  }
`;
const Dismiss = styled.div`
  position: absolute;
  right: -7px;
  top: -3px;
  @media (min-width: ${(props) => props.theme.breakpoints[0]}) {
    right: 0;
    top: 0;
  }
`;

/**
  * Detailed timeseries line graph for single focus area, uses react-vis
  * Can plot multiple timeseries and marks reference and active timeseries
  *
  * @return {Component} Timeseries line graph for many subjects
  *
  */
class PlotFocusAreaDetails extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
    * Component constructor, sets initial state
    * @param {object} props component props
    */
  constructor(props) {
    super(props);
    this.state = { subjectHighlightedId: null };
  }
  /**
    * 'Highlight survey' handler - highlights survey in plot
    * @param {string} surveyHighlightedId the survey to highlight
    */
  onHighlightSubject(subjectHighlightedId) {
    this.setState({ subjectHighlightedId: subjectHighlightedId || null });
  }

  render() {
    const {
      focusArea,
      surveyHighlightedId,
      surveys,
      subject,
      referenceSubject,
      otherSubjects,
      onHighlightSurvey,
      theme,
      onSelectSubject,
      focusAreaIcon,
      onDismiss,
    } = this.props;

    const { subjectHighlightedId } = this.state;

    // arrange data to be consumable for AreaSeries and ScreenReaderDataTable
    const data = prepareData(subject, focusArea, surveys);

    const referenceData = referenceSubject && prepareData(referenceSubject, focusArea, surveys);

    const otherData = otherSubjects && otherSubjects.reduce((memo, item) =>
      item.get('subject_id') === subjectHighlightedId
      ? memo
      : memo.concat([prepareData(item, focusArea, surveys)])
    , []);

    const otherSubjectHighlighted = subjectHighlightedId
      && subject.get('subject_id') !== subjectHighlightedId
      && (!referenceSubject || referenceSubject.get('subject_id') !== subjectHighlightedId)
        ? otherSubjects.find((item) => item.get('subject_id') === subjectHighlightedId)
        : null;
    const otherDataHighlighted = otherSubjectHighlighted && prepareData(otherSubjectHighlighted, focusArea, surveys);

    // set hint value for current subject and highlighted survey
    const hintValue =
      !subjectHighlightedId
      || subjectHighlightedId === subject.get('subject_id')
        ? data.find((d) => quasiEquals(d.column, surveyHighlightedId))
        : null;
    // set hint value for current subject and highlighted survey
    const labelHintValue =
      !subjectHighlightedId
      || subjectHighlightedId === subject.get('subject_id')
        ? data.find((d) => quasiEquals(d.column, surveys.last().get('survey_id')))
        : null;

    // set hint value for reference subject and highlighted survey
    const hintReference = !hintValue
      && ((referenceData && !subjectHighlightedId)
        || (referenceSubject && subjectHighlightedId === referenceSubject.get('subject_id'))
      )
        ? referenceData.find((d) => quasiEquals(d.column, surveyHighlightedId))
        : null;

    const labelHintReference = referenceData
      && referenceSubject
      && subjectHighlightedId === referenceSubject.get('subject_id')
        ? referenceData.find((d) => quasiEquals(d.column, surveys.last().get('survey_id')))
        : null;

    // set hint value for other highlighted subject and highlighted survey
    const hintOther = otherData && subjectHighlightedId && otherDataHighlighted
      ? otherDataHighlighted.find((d) => quasiEquals(d.column, surveyHighlightedId))
      : null;
    const labelHintOther = otherData && subjectHighlightedId && otherDataHighlighted
      ? otherDataHighlighted.find((d) => quasiEquals(d.column, surveys.last().get('survey_id')))
      : null;

    // axis ranges
    let xAxisRange = [
      new Date(surveys.first().get('date')).getTime(),
      new Date(surveys.last().get('date')).getTime(),
    ];
    const yAxisRange = [0, 100];

    // dummy data to force the area plot from 0 to 100%
    const dataForceYRange = [{ x: xAxisRange[0], y: yAxisRange[0] }, { x: xAxisRange[0], y: yAxisRange[1] }];

    const surveyHighlighted = surveys.find((item) => quasiEquals(item.get('survey_id'), surveyHighlightedId));
    if (surveyHighlighted && xAxisRange.indexOf(new Date(surveyHighlighted.get('date')).getTime()) < 0) {
      xAxisRange = [new Date(surveyHighlighted.get('date')).getTime()];
    }

    return (
      <Card
        onMouseLeave={() => this.onHighlightSubject(false)}
      >
        <CardHeader dismissable>
          <ScreenReaderOnly>
            {getLabel('component.focus-areas.focus-area')}
          </ScreenReaderOnly>
          <CardTitle title={focusArea.get('title')} icon={focusAreaIcon} />
          <Dismiss>
            <Close
              onClick={onDismiss}
              altTitle={getLabel('screenreader.focus-area.button.dismiss')}
            />
          </Dismiss>
        </CardHeader>
        <CardBody>
          <ScreenReaderWrapPlot
            figCaption={getLabel('screenreader.focus-areas.chart-caption')}
            tableCaption={getLabel('screenreader.focus-areas.chart-table-caption')}
            tableData={{
              data: referenceSubject
                ? data.concat(referenceData).concat(otherData.reduce((memo, d) => memo.concat(d), []))
                : data.concat(otherData.reduce((memo, d) => memo.concat(d), [])),
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
              ).concat(otherSubjects.reduce((memo, item) =>
                memo.concat([{
                  id: item.get('subject_id'),
                  label: `${item.get('title')} ${getLabel('screenreader.focus-areas.chart-table-reference-hint')}`,
                }])
              , [])),
            }}
            formatValue={(datum) => formatValue(datum.y, focusArea.get('type'))}
          >
            <WrapPlot>
              <FlexibleWidthXYPlot
                height={300}
                xType="time"
                onMouseLeave={() => {
                  this.onHighlightSubject(false);
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
                  tickValues={[0, 25, 50, 75, 100]}
                  tickFormat={(value) => formatValue(value, focusArea.get('type'))}
                  style={{
                    strokeWidth: 0,
                    ticks: { strokeWidth: 1 },
                  }}
                  tickSize={3}
                  tickPadding={2}
                />
                { otherSubjects && otherData.map((d) => d.length > 1
                  ? (
                    <LineSeries
                      key={d[0].row}
                      data={d}
                      style={{
                        stroke: theme.colors.faReference,
                        strokeWidth: 1,
                      }}
                    />
                  )
                  : (
                    <MarkSeries
                      key={d[0].row}
                      data={d}
                      size={3}
                      style={{
                        fill: theme.colors.faReference,
                        strokeWidth: 0,
                      }}
                    />
                  )
                )}
                { otherDataHighlighted && (otherDataHighlighted.length > 1
                  ? (
                    <LineSeries
                      data={otherDataHighlighted}
                      style={{
                        stroke: theme.colors.developing[focusArea.get('indicator_id')],
                        strokeWidth: 2,
                      }}
                    />
                  )
                  : (
                    <MarkSeries
                      data={otherDataHighlighted}
                      size={3}
                      style={{
                        fill: theme.colors.developing[focusArea.get('indicator_id')],
                        strokeWidth: 0,
                      }}
                    />
                  )
                )}
                <LineMarkSeries
                  data={data}
                  size={3}
                  style={{
                    fill: theme.colors[focusArea.get('indicator_id')],
                    stroke: theme.colors[focusArea.get('indicator_id')],
                  }}
                  onNearestX={(value) => onHighlightSurvey(value.column)}
                />
                { otherSubjects && otherData.map((d) => (
                  <LineSeries
                    key={d[0].row}
                    data={d}
                    style={{
                      stroke: 'rgba(0,0,0,0)',
                      strokeWidth: 10,
                      cursor: 'pointer',
                    }}
                    onSeriesMouseOver={() => this.onHighlightSubject(d[0].row)}
                    onSeriesMouseOut={() => this.onHighlightSubject(false)}
                    onSeriesClick={() => onSelectSubject(d[0].row)}
                  />
                ))}
                { otherDataHighlighted &&
                  <LineSeries
                    data={otherDataHighlighted}
                    style={{
                      stroke: 'rgba(0,0,0,0)',
                      strokeWidth: 10,
                      cursor: 'pointer',
                    }}
                    onSeriesMouseOver={() => this.onHighlightSubject(otherDataHighlighted[0].row)}
                    onSeriesMouseOut={() => this.onHighlightSubject(false)}
                    onSeriesClick={() => onSelectSubject(otherDataHighlighted[0].row)}
                  />
                }
                { referenceSubject &&
                  <LineSeries
                    data={referenceData}
                    style={{
                      stroke: subjectHighlightedId === referenceSubject.get('subject_id')
                        ? theme.colors[focusArea.get('indicator_id')]
                        : theme.colors.black,
                      strokeWidth: subjectHighlightedId === referenceSubject.get('subject_id')
                        ? 2
                        : 1,
                    }}
                  />
                }
                { referenceSubject &&
                  <LineSeries
                    data={referenceData}
                    style={{
                      stroke: 'rgba(0,0,0,0)',
                      strokeWidth: 10,
                      cursor: 'pointer',
                    }}
                    onSeriesMouseOver={() => this.onHighlightSubject(referenceSubject.get('subject_id'))}
                    onSeriesMouseOut={() => this.onHighlightSubject(false)}
                    onSeriesClick={() => onSelectSubject(referenceSubject.get('subject_id'))}
                  />
                }
                { labelHintValue &&
                  <Hint
                    value={labelHintValue}
                    align={{ vertical: 'bottom', horizontal: 'rightEdge' }}
                    style={{ transform: 'translate(100%, -50%)' }}
                  >
                    <PlotHintLabel>
                      {subject.get('title')}
                    </PlotHintLabel>
                  </Hint>
                }
                { labelHintReference &&
                  <Hint
                    value={labelHintReference}
                    align={{ vertical: 'bottom', horizontal: 'rightEdge' }}
                    style={{ transform: 'translate(100%, -50%)' }}
                  >
                    <PlotHintLabel>
                      {referenceSubject.get('title')}
                    </PlotHintLabel>
                  </Hint>
                }
                { labelHintOther &&
                  <Hint
                    value={labelHintOther}
                    align={{ vertical: 'bottom', horizontal: 'rightEdge' }}
                    style={{ transform: 'translate(100%, -50%)' }}
                  >
                    <PlotHintLabel>
                      {otherSubjectHighlighted.get('title')}
                    </PlotHintLabel>
                  </Hint>
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
                { hintReference &&
                  <Hint
                    value={hintReference}
                    align={{ vertical: 'top', horizontal: 'left' }}
                    style={{ transform: 'translateX(50%)' }}
                  >
                    <PlotHint background={focusArea.get('indicator_id')}>
                      { formatValue(hintReference.y, focusArea.get('type')) }
                    </PlotHint>
                  </Hint>
                }
                { hintOther &&
                  <Hint
                    value={hintOther}
                    align={{ vertical: 'top', horizontal: 'left' }}
                    style={{ transform: 'translateX(50%)' }}
                  >
                    <PlotHint background={focusArea.get('indicator_id')}>
                      { formatValue(hintOther.y, focusArea.get('type')) }
                    </PlotHint>
                  </Hint>
                }
              </FlexibleWidthXYPlot>
              { referenceSubject &&
                <Key>
                  <KeyEntry
                    line
                    small
                    color="black"
                    title={referenceSubject.get('title')}
                  />
                </Key>
              }
            </WrapPlot>
          </ScreenReaderWrapPlot>
        </CardBody>
      </Card>
    );
  }
}

PlotFocusAreaDetails.propTypes = {
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
  /** list of other subjects */
  otherSubjects: PropTypes.instanceOf(List),
  /** highlight survey handler */
  onHighlightSurvey: PropTypes.func.isRequired,
  /** subject select handler */
  onSelectSubject: PropTypes.func.isRequired,
  /** close view handler */
  onDismiss: PropTypes.func.isRequired,
  /** focus area icon */
  focusAreaIcon: PropTypes.string.isRequired,
  /** global theme */
  theme: PropTypes.object.isRequired,
};

export default withTheme(PlotFocusAreaDetails);
