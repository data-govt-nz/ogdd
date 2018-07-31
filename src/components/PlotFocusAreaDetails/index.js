import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import {
  FlexibleWidthXYPlot,
  XAxis,
  YAxis,
  GridLines,
  AreaSeries,
  LineSeries,
  LineMarkSeries,
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

const WrapPlot = styled.div`
  padding-top: 30px;
  padding-left: 100px;
  padding-right: 130px;
`;

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

class PlotFocusAreaDetails extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = { subjectHighlightedId: null };
  }

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
    } = this.props;

    const { subjectHighlightedId } = this.state;

    // arrange data to be consumable for AreaSeries and ScreenReaderDataTable
    const data = prepareData(subject, this.props);

    const referenceData = referenceSubject && prepareData(referenceSubject, this.props);

    const otherData = otherSubjects && otherSubjects.reduce((memo, item) =>
      item.get('subject_id') === subjectHighlightedId
      ? memo
      : memo.concat([prepareData(item, this.props)])
    , []);

    const otherSubjectHighlighted = subjectHighlightedId
      && subject.get('subject_id') !== subjectHighlightedId
      && (!referenceSubject || referenceSubject.get('subject_id') !== subjectHighlightedId)
        ? otherSubjects.find((item) => item.get('subject_id') === subjectHighlightedId)
        : null;
    const otherDataHighlighted = otherSubjectHighlighted && prepareData(otherSubjectHighlighted, this.props)

    // set hint value from highlighted survey

    // const hintValue =
    // // subjectHighlightedId
    //   // ? referenceData.find((d) => attributesEqual(d.column, surveyHighlightedId) && attributesEqual(d.row, subjectHighlightedId))
    //   // :
    //   data.find((d) => attributesEqual(d.column, surveyHighlightedId));

    // axis ranges
    const xAxisRange = [
      new Date(surveys.first().get('date')).getTime(),
      new Date(surveys.last().get('date')).getTime(),
    ];
    // const surveyHighlighted = surveys.find((item) => attributesEqual(item.get('survey_id'), surveyHighlightedId));
    // if (surveyHighlighted && xAxisRange.indexOf(new Date(surveyHighlighted.get('date')).getTime()) < 0) {
    //   xAxisRange = xAxisRange.concat(new Date(surveyHighlighted.get('date')).getTime());
    // }

    const yAxisRange = [0, 100];

    // dummy data to force the area plot from 0 to 100%
    const dataForceYRange = [{ x: xAxisRange[0], y: yAxisRange[0] }, { x: xAxisRange[0], y: yAxisRange[1] }];

    return (
      <Card>
        <CardBody>
          <WrapPlot>
            <FlexibleWidthXYPlot
              height={300}
              xType="time"
            >
              <AreaSeries data={dataForceYRange} style={{ opacity: 0 }} />
              <XAxis
                tickValues={xAxisRange}
                tickFormat={timeFormat('%Y')}
              />
              <YAxis
                tickValues={[0, 25, 50, 75, 100]}
                tickFormat={(value) => formatValue(value, focusArea.get('type'))}
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
            </FlexibleWidthXYPlot>
          </WrapPlot>
        </CardBody>
      </Card>
    );
  }
}

PlotFocusAreaDetails.propTypes = {
  focusArea: PropTypes.object.isRequired,
  surveyHighlightedId: PropTypes.string.isRequired,
  surveys: PropTypes.object.isRequired,
  subject: PropTypes.object.isRequired,
  referenceSubject: PropTypes.object,
  otherSubjects: PropTypes.object,
  onHighlightSurvey: PropTypes.func.isRequired,
  onSelectSubject: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withTheme(PlotFocusAreaDetails);
