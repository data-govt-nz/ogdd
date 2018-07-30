// vendor
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { timeFormat } from 'd3-time-format';

import getLabel from 'utils/get-label';
import attributesEqual from 'utils/attributes-equal';

// containers, app selectors, metaDescription
import {
  selectIndicators,
  selectOutcomes,
  selectSurveys,
  selectInsights,
  selectSurveyIdFromLocation,
} from 'containers/App/selectors';
import { navigate } from 'containers/App/actions';

import {
  FOCUSAREA_COLORICONS,
} from 'containers/App/constants';

// components
import Label from 'components/Label';
import PageTitle from 'components/PageTitle';
import ReadMore from 'components/ReadMore';
import FSModal from 'components/FSModal';
import AsideContent from 'components/AsideContent';
import PlotInsight from 'components/PlotInsight';

// simple styles (styled components)
import Row from 'styles/Row';
import Column from 'styles/Column';
import PageLongTitle from 'styles/PageLongTitle';
import PageContainer from 'styles/PageContainer';
import Hidden from 'styles/Hidden';
import Visible from 'styles/Visible';

// assets
import titleIcon from 'assets/React-icon.png';
import description from 'labels/insights.md'; // loaded as HTML from markdown

const PageTitleWrapper = styled.div`
  position: relative;
`;

const ReadMoreWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`;

const SurveySelect = styled.div`
  min-height: 40px;
  position: relative;
  width: 100%;
`;

const INITIAL_STATE = {
  showModal: false,
};

class PageInsights extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  onReadMore(showModal = true) {
    this.setState({ showModal });
  }
  onFSModalDismiss() {
    this.setState({
      showModal: false,
    });
  }
  onSurveyChange(e) {
    this.props.nav({ query: { survey: e.target.value } });
  }

  renderPageTitle() {
    return (
      <PageTitle labelId="component.insights.title" iconSrc={titleIcon} />
    );
  }

  renderAsideContent() {
    return (
      <AsideContent
        title={this.renderPageTitle()}
        html={description}
      >
        <p>
          TODO: focus area key
        </p>
        <p>
          TODO: participating hint
        </p>
      </AsideContent>
    );
  }

  render() {
    const { insights, surveys, indicators, surveySelectedId, outcomes } = this.props;

    const ready = indicators && surveys && outcomes && insights !== null;

    const surveyID = surveySelectedId || (ready && surveys.last().get('survey_id'));

    const survey = ready && surveys.find((item) => attributesEqual(item.get('survey_id'), surveyID));

    const relevantInsights = ready && insights
      .filter((insight) => attributesEqual(insight.get('survey_id'), surveyID))
      .map((insight) => insight.set('indicator', indicators.find((indicator) =>
        attributesEqual(insight.get('indicator_id'), indicator.get('indicator_id'))
      )))
      .sortBy((insight) => insight.getIn(['indicator', 'parent_indicator_id']));

    return (
      <PageContainer>
        <Helmet>
          <title>{getLabel('component.insights.title')}</title>
          <meta
            name="description"
            content={getLabel('component.insights.metaDescription')}
          />
        </Helmet>
        <Hidden min={0}>
          <PageTitleWrapper>
            { this.renderPageTitle() }
            <ReadMoreWrapper>
              <ReadMore onClick={() => this.onReadMore()} />
            </ReadMoreWrapper>
          </PageTitleWrapper>
        </Hidden>
        { this.state.showModal &&
          <FSModal dismiss={() => this.onFSModalDismiss()}>
            { this.renderAsideContent() }
          </FSModal>
        }
        <PageLongTitle id="pageTitle">
          <Label id="component.insights.longTitle" />
        </PageLongTitle>
        <Row>
          <Column width={[1, 3 / 4]}>
            <SurveySelect>
              { ready &&
                <div>
                  <label htmlFor="survey-select" >
                    <Label id="component.insights.selectSurveyLabel" />
                  </label>
                  <select
                    id="survey-select"
                    value={surveyID}
                    onChange={((e) => this.onSurveyChange(e))}
                  >
                    { surveys.map((item) => (
                      <option key={item.get('survey_id')} value={item.get('survey_id')} >
                        { timeFormat('%Y')(new Date(item.get('date')).getTime()) }
                      </option>
                    ))}
                  </select>
                </div>
              }
            </SurveySelect>
          </Column>
        </Row>
        <Row>
          <Column width={[1, 1 / 4]} order={2}>
            <Visible min={0} >
              { this.renderAsideContent() }
            </Visible>
          </Column>
          <Column width={[1, 3 / 4]} order={1}>
            <Row>
              { ready && relevantInsights.map((insight) => (
                <Column
                  width={[1, 1 / 2, 1 / 3]}
                  key={insight.get('insight_id')}
                >
                  <PlotInsight
                    insight={insight.set(
                      'outcomes',
                      outcomes.filter((outcome) =>
                        attributesEqual(outcome.get('survey_id'), surveyID)
                        && attributesEqual(outcome.get('indicator_id'), insight.get('indicator_id'))
                      )
                    )}
                    agenciesTotal={parseInt(survey.get('agencies_total'), 10)}
                    focusAreaIcon={FOCUSAREA_COLORICONS[insight.getIn(['indicator', 'parent_indicator_id'])]}
                  />
                </Column>
              ))}
            </Row>
          </Column>
        </Row>
      </PageContainer>
    );
  }
}

PageInsights.propTypes = {
  indicators: PropTypes.object,
  surveys: PropTypes.object,
  insights: PropTypes.object,
  outcomes: PropTypes.object,
  nav: PropTypes.func,
  surveySelectedId: PropTypes.string,
};

const mapStateToProps = (state) => ({
  indicators: selectIndicators(state),
  outcomes: selectOutcomes(state),
  surveys: selectSurveys(state),
  insights: selectInsights(state),
  surveySelectedId: selectSurveyIdFromLocation(state),
});

const mapDispatchToProps = (dispatch) => ({
  // navigate to location
  nav: (location) => {
    dispatch(navigate(location));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PageInsights);
