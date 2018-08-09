import React from 'react';
import PropTypes from 'prop-types';

import attributesEqual from 'utils/attributes-equal';
import { DEFAULT_SUBJECT_ID } from 'containers/App/constants';

import PlotServicesSmall from 'components/PlotServicesSmall';

import Row from 'styles/Row';
import Column from 'styles/Column';
import Card from 'components/Card';
import CardBody from 'styles/CardBody';

class PlotServicesMultiples extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      indicator,
      surveyHighlightedId,
      surveys,
      onHighlightSurvey,
      onCardMouseLeave,
    } = this.props;
    // arrange data to be consumable for AreaSeries and ScreenReaderDataTable
    const groups = indicator
      .get('outcomes')
      .filter((outcome) => attributesEqual(outcome.get('subject_id'), DEFAULT_SUBJECT_ID))
      .groupBy((outcome) => outcome.get('answer'));

    return (
      <Card
        onMouseLeave={onCardMouseLeave}
      >
        <CardBody withoutTitle>
          <Row>
            { groups.toList().map((group) => (
              <Column
                width={[1, 1 / 2, 1 / 3]}
                key={group.first().get('answer')}
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

// indicator={indicator}
PlotServicesMultiples.propTypes = {
  indicator: PropTypes.object.isRequired,
  surveyHighlightedId: PropTypes.string.isRequired,
  surveys: PropTypes.object.isRequired,
  onHighlightSurvey: PropTypes.func.isRequired,
  onCardMouseLeave: PropTypes.func.isRequired,
};

export default PlotServicesMultiples;
