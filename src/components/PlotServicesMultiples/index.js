// vendor
import React from 'react';
import PropTypes from 'prop-types';
import { Map, List } from 'immutable';
// utils
import quasiEquals from 'utils/quasi-equals';
// containers
import { DEFAULT_SUBJECT_ID } from 'containers/App/constants';
// components
import PlotServicesSmall from 'components/PlotServicesSmall';
import Card from 'components/Card';
// styles
import Row from 'styles/Row';
import Column from 'styles/Column';
import CardBody from 'styles/CardBody';

/**
  * Card for 3rd services indicator, one plot for every indicator answer
  *
  * @return {Component} Small multiples card
  *
  */
class PlotServicesMultiples extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      indicator,
      surveyHighlightedId,
      surveys,
      onHighlightSurvey,
      onCardMouseLeave,
    } = this.props;
    // get indicator outcomes and group data by answer
    const groups = indicator
      .get('outcomes')
      .filter((outcome) => quasiEquals(outcome.get('subject_id'), DEFAULT_SUBJECT_ID))
      .groupBy((outcome) => outcome.get('answer'));

    return (
      <Card onMouseLeave={onCardMouseLeave} >
        <CardBody withoutTitle>
          <Row withoutgutter="true">
            { groups.toList().map((group) => (
              <Column
                width={[1, 1 / 2, 1 / 3]}
                key={group.first().get('answer')}
                withoutgutter="true"
              >
                <PlotServicesSmall
                  indicatorType={indicator.get('type')}
                  outcomes={group}
                  surveyHighlightedId={surveyHighlightedId}
                  surveys={surveys}
                  onHighlightSurvey={onHighlightSurvey}
                />
              </Column>
            ))}
          </Row>
        </CardBody>
      </Card>
    );
  }
}

PlotServicesMultiples.propTypes = {
  /** the indicator */
  indicator: PropTypes.instanceOf(Map).isRequired,
  /** currently highlighted survey */
  surveyHighlightedId: PropTypes.string.isRequired,
  /** all surveys */
  surveys: PropTypes.instanceOf(List).isRequired,
  /** survey highlight handler */
  onHighlightSurvey: PropTypes.func.isRequired,
  /** mouse leave handler */
  onCardMouseLeave: PropTypes.func.isRequired,
};

export default PlotServicesMultiples;
