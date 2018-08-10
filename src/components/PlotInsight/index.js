/**
  * Description
  *
  * @author [tmfrnz](https://github.com/tmfrnz)
  */
import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme, css } from 'styled-components';
import { fromJS, Map } from 'immutable';

import getLabel from 'utils/get-label';
import formatValue from 'utils/format-value';

import { ANSWERS, FOCUSAREA_ICONS } from 'containers/App/constants';

import CardTitle from 'components/CardTitle';
import KeyEntry from 'components/KeyEntry';

import Card from 'components/Card';
import CardBody from 'styles/CardBody';

const InsightValue = styled.div`
  font-weight: 600;
  font-size: ${(props) => props.theme.sizes[3]};
  color: ${(props) => props.color
    ? props.theme.colors[props.color]
    : props.theme.colors.dark
  };
  margin-bottom: 10px;
`;

const InsightText = styled.div`
  font-size: 15px;
`;
const IndicatorPlot = styled.div``;
const IndicatorBar = styled.div`
  width: 100%;
  height: 30px;
  position: relative;
  margin: 30px 0 15px;
`;
const OutcomeBar = styled.div`
  float: left;
  height: 30px;
  background-color: ${(props) => props.outline ? 'transparent' : props.colorValue};
  width: ${(props) => props.value}%;
  margin: 0 -1px;
  border: 1px solid;
  border-color: ${(props) => props.colorValue};
  position: relative;

  ${(props) => props.marked && css`
    &:after{
      content: '';
      position: absolute;
      left: -1px;
      right: 1px;
      border-top: 1px solid black;
      border-left: ${() => props.markedFirst ? '1px solid' : 0};
      border-right: ${() => props.markedLast ? '1px solid' : 0};
      top: -12px;
      height: 5px;
      display: block;
    }
  `}
`;
const IndicatorOutcomes = styled.div``;

const hasOutline = (answer) => answer === ANSWERS[6]; // not stated

const getColorValue = (answer, indicatorID, theme) => {
  if (answer === ANSWERS[0]) { // yes
    return theme.colors[indicatorID];
  }
  if (typeof theme.colors[answer] === 'string') {
    return theme.colors[answer];
  }
  return theme.colors[answer][indicatorID];
};

class PlotInsight extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { insight, focusArea, theme, agenciesTotal } = this.props;

    const outcomeAnswers = insight.get('outcome_answers').split(',');
    const markedTotal = outcomeAnswers.length;
    let markedSum = 0;
    let outcomesOrdered = insight
      .get('outcomes')
      .sortBy((item) => ANSWERS.indexOf(item.get('answer')))
      .map((item) => {
        if (outcomeAnswers.indexOf(item.get('answer')) > -1) {
          markedSum += 1;
          return item
            .set('marked', true)
            .set('markedFirst', markedSum === 1)
            .set('markedLast', markedSum === markedTotal);
        }
        return item;
      })
      .toList();

    let totalValue = outcomesOrdered.reduce((memo, item) => memo + parseFloat(item.get('value'), 10), 0);

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
            iconSrc={FOCUSAREA_ICONS[focusArea.get('indicator_id')]}
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
  insight: PropTypes.instanceOf(Map).isRequired,
  focusArea: PropTypes.instanceOf(Map).isRequired,
  theme: PropTypes.object.isRequired,
  agenciesTotal: PropTypes.number,
};

export default withTheme(PlotInsight);
