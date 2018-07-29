import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';

import getLabel from 'utils/get-label';
import attributesEqual from 'utils/attributes-equal';
import formatValue from 'utils/format-value';

import CardTitle from 'components/CardTitle';

import Card from 'styles/Card';
import CardBody from 'styles/CardBody';
import ScreenReaderOnly from 'styles/ScreenReaderOnly';

const InsightValue = styled.div`
  font-weight: 600;
  font-size: ${(props) => props.theme.sizes[2]};
  color: ${(props) => props.color
    ? props.theme.colors[props.color]
    : props.theme.colors.dark
  }
`;

const InsightText = styled.div`
  font-size: ${(props) => props.theme.sizes[1]};
`;

class PlotInsight extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { insight, focusAreaIcon } = this.props;

    return (
      <Card>
        <div>
          <CardTitle iconSrc={focusAreaIcon} />
        </div>
        <CardBody>
          <InsightValue
            color={insight.get('outcome_answers').split(',').indexOf('yes') > -1
              ? insight.getIn(['indicator', 'parent_indicator_id'])
              : null
            }
          >
            {`${insight.get('value')}%`}
          </InsightValue>
          <InsightText>
            {insight.get('text')}
          </InsightText>
        </CardBody>
      </Card>
    );
  }
}

PlotInsight.propTypes = {
  insight: PropTypes.object.isRequired,
  focusAreaIcon: PropTypes.string.isRequired,
};

export default withTheme(PlotInsight);
