// vendor
import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme, css } from 'styled-components';
import { fromJS, Map } from 'immutable';
// utils
import getLabel from 'utils/get-label';
import formatValue from 'utils/format-value';
// constants
import { ANSWERS } from 'containers/App/constants';
// components
import CardTitle from 'components/CardTitle';
import KeyEntry from 'components/KeyEntry';
import Card from 'components/Card';
// styles
import CardBody from 'styles/CardBody';

// component utils
import hasOutline from './has-outline';
import getColorValue from './get-color-value';

// component styles
const InsightValue = styled.div`
  font-weight: 700;
  font-size: ${(props) => props.theme.sizes[3]};
  color: ${(props) => props.color
    ? props.theme.colors[props.color]
    : props.theme.colors.dark
  };
  margin-top: 12px;
  margin-bottom: 10px;
`;
const InsightText = styled.div`
  font-size: 15px;
  font-weight: 500;
  line-height: 1.3;
`;
const IndicatorPlot = styled.div``;
const IndicatorBar = styled.div`
  width: 100%;
  height: 30px;
  position: relative;
  margin: 25px 0 10px;
`;
const OutcomeBar = styled.div`
  float: left;
  height: 30px;
  background-color: ${(props) => props.outline ? 'transparent' : props.colorValue} !important;
  width: ${(props) => props.value}%;
  border: 1px solid;
  border-color: ${(props) => props.colorValue};
  position: relative;
  ${(props) => props.marked && css`
    &:after{
      content: '';
      position: absolute;
      left: -1px;
      right: -1px;
      border-top: 1px solid ${props.theme.colors.black};
      border-left: ${props.markedFirst ? '1px solid' : 0};
      border-right: ${props.markedLast ? '1px solid' : 0};
      top: -12px;
      height: 5px;
      display: block;
    }
  `}
  @media print {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
`;
const IndicatorOutcomes = styled.div`
  position: relative;
  left: -2px;
`;

/**
  * Key insight component shoing key insight and associated indicator as stacked bar
  * highlights relevant answers
  *
  * @return {Component} Key insight component
  *
  */
class PlotInsight extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { insight, focusArea, theme, agenciesTotal } = this.props;
    // get relevant answers from insight
    const outcomeAnswers = insight.get('outcome_answers').split(',');
    // number of relevant answers
    const markedTotal = outcomeAnswers.length;
    let answerTotal = 0;
    // prepare insight outcomes and count number of total answers
    let outcomesOrdered = insight
      .get('outcomes')
      .sortBy((item) => ANSWERS.indexOf(item.get('answer')))
      .map((item) => {
        if (outcomeAnswers.indexOf(item.get('answer')) > -1) {
          answerTotal += 1;
          return item
            .set('marked', true)
            .set('markedFirst', answerTotal === 1)
            .set('markedLast', answerTotal === markedTotal);
        }
        return item;
      })
      .toList();

    // sum of all answers
    let totalValue = outcomesOrdered.reduce((memo, item) => memo + parseFloat(item.get('value'), 10), 0);

    // consider any significant gaps as 'not stated'
    if ((100 - totalValue) > (100 / agenciesTotal)) {
      outcomesOrdered = outcomesOrdered.push(fromJS({
        value: 100 - totalValue,
        answer: ANSWERS[6], // not not_stated
        answer_text: getLabel('answers.not_stated'),
      }));
      totalValue = 100;
    }

    return (
      <Card>
        <div>
          <CardTitle
            icon={focusArea.get('indicator_id')}
            altTitle={`${getLabel('screenreader.insights.focus-area-label')} ${focusArea.get('title')}`}
          />
        </div>
        <CardBody>
          <InsightValue
            color={outcomeAnswers.indexOf(ANSWERS[0]) > -1
              ? insight.getIn(['indicator', 'parent_indicator_id'])
              : null
            }
          >
            {`${insight.get('value')}%`}
          </InsightValue>
          <InsightText>
            {insight.get('text')}
          </InsightText>
          <IndicatorPlot>
            <IndicatorBar aria-hidden="true" role="presentation">
              {
                outcomesOrdered.map((item) => (
                  <OutcomeBar
                    key={item.get('answer')}
                    marked={item.get('marked')}
                    markedFirst={item.get('markedFirst')}
                    markedLast={item.get('markedLast')}
                    value={(item.get('value') / totalValue) * 100}
                    outline={hasOutline(item.get('answer'))}
                    colorValue={getColorValue(item.get('answer'), insight.getIn(['indicator', 'parent_indicator_id']), theme)}
                  />
                ))
              }
            </IndicatorBar>
            <IndicatorOutcomes>
              {
                outcomesOrdered.map((item) => (
                  <KeyEntry
                    small
                    area
                    key={item.get('answer')}
                    title={`${formatValue(item.get('value'), insight.getIn(['indicator', 'type']))} ${item.get('answer_text')}`}
                    outline={hasOutline(item.get('answer'))}
                    colorValue={getColorValue(item.get('answer'), insight.getIn(['indicator', 'parent_indicator_id']), theme)}
                  />
                ))
              }
            </IndicatorOutcomes>
          </IndicatorPlot>
        </CardBody>
      </Card>
    );
  }
}

PlotInsight.propTypes = {
  /** the insight joined with outcomes */
  insight: PropTypes.instanceOf(Map).isRequired,
  /** the focus area for insight */
  focusArea: PropTypes.instanceOf(Map).isRequired,
  /** global theme */
  theme: PropTypes.object.isRequired,
  /** number of agencies for survey */
  agenciesTotal: PropTypes.number,
};

export default withTheme(PlotInsight);
