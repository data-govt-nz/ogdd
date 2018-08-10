/**
  * The 'key insights' component.
  * Shows description and key insights, including associated survey question indicators
  *
  * @author [tmfrnz](https://github.com/tmfrnz)
  */
// vendor
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { List } from 'immutable';
import styled from 'styled-components';
import { timeFormat } from 'd3-time-format';
// utils
import getLabel from 'utils/get-label';
import quasiEquals from 'utils/quasi-equals';
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
  FOCUSAREA_WHITEICONS,
} from 'containers/App/constants';
import SurveyInformation from 'containers/SurveyInformation';
// components
import Label from 'components/Label';
import PageTitle from 'components/PageTitle';
import ReadMore from 'components/ReadMore';
import FSModal from 'components/FSModal';
import AsideContent from 'components/AsideContent';
import PlotInsight from 'components/PlotInsight';
import FAKeyEntry from 'components/FAKeyEntry';
import SelectWrapper from 'components/SelectWrapper';
// simple styles (styled components)
import Row from 'styles/Row';
import Column from 'styles/Column';
import PageLongTitle from 'styles/PageLongTitle';
import PageContainer from 'styles/PageContainer';
import Hidden from 'styles/Hidden';
import Visible from 'styles/Visible';
import PageTitleWrapper from 'styles/PageTitleWrapper';
import ReadMoreWrapper from 'styles/ReadMoreWrapper';
import AbovePlots from 'styles/AbovePlots';
// assets
import titleIcon from 'assets/key-insights.svg';
import description from 'text/insights.md'; // loaded as HTML from markdown

// component styles
const FAKey = styled.div``;

// initial component state
const INITIAL_STATE = {
  showModal: false, // show/hide modal
};

class PathInsights extends React.Component { // eslint-disable-line react/prefer-stateless-function
  /**
    * Component constructor, sets initial state
    * @param {object} props component props
    */
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }
  /**
    * 'Read more' button handler - shows/hides modal
    * @param {boolean} [showModal=true] show or hide modal
    */
  onReadMore(showModal = true) {
    this.setState({ showModal });
  }
  /**
    * 'Modal dismiss' button handler - hides modal
    */
  onFSModalDismiss() {
    this.setState({
      showModal: false,
    });
  }
  /**
    * 'Survey change' select handler - adds survey to router query by dispatching navigation action
    * @param {string} survey survey id
    */
  onSurveyChange(survey) {
    this.props.nav({ query: { survey } });
  }
  /**
    * Render page title
    * @return {Component} Page title component
    */
  renderPageTitle() {
    return (
      <PageTitle labelId="component.insights.title" iconSrc={titleIcon} />
    );
  }
  /**
    * Render sidebar content
    * @param {object} focusAreas list of focus areas
    * @param {object} surveyID current survey id
    * @return {Component} Aside component
    */
  renderAsideContent(focusAreas, surveyID) {
    return (
      <AsideContent
        title={this.renderPageTitle()}
        html={description}
      >
        <FAKey role="presentation">
          {
            focusAreas && focusAreas.map((fa) => (
              <FAKeyEntry
                key={fa.get('indicator_id')}
                title={fa.get('title')}
                color={fa.get('indicator_id')}
                iconSrc={FOCUSAREA_WHITEICONS[fa.get('indicator_id')]}
              />
            ))
          }
        </FAKey>
        { surveyID &&
          <SurveyInformation surveySelectedId={surveyID} />
        }
      </AsideContent>
    );
  }

  render() {
    const { insights, surveys, indicators, surveySelectedId, outcomes } = this.props;

    // check if all data is available
    const ready = indicators && surveys && outcomes && insights !== null;
    // figure out current survey, default to last
    const surveyID = surveySelectedId || (ready && surveys.last().get('survey_id'));
    const survey = ready && surveys.find((item) => quasiEquals(item.get('survey_id'), surveyID));

    // prepare relevant insights for current survey,
    // join with question indicator, and sort by parent indicator (focus area)
    const relevantInsights = ready && insights
      .filter((insight) => quasiEquals(insight.get('survey_id'), surveyID))
      .map((insight) => insight.set('indicator', indicators.find((indicator) =>
        quasiEquals(insight.get('indicator_id'), indicator.get('indicator_id'))
      )))
      .sortBy((insight) => insight.getIn(['indicator', 'parent_indicator_id']));

    // figure out relevant focus areas for insights
    const relevantFocusAreas = ready && relevantInsights
      .reduce((memo, insight) => {
        const faID = insight.getIn(['indicator', 'parent_indicator_id']);
        return memo.find((item) => quasiEquals(item.get('indicator_id'), faID))
          ? memo
          : memo.push(indicators.find((item) => quasiEquals(item.get('indicator_id'), faID)));
      }, List());

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
            { this.renderAsideContent(relevantFocusAreas, surveyID) }
          </FSModal>
        }
        <PageLongTitle id="pageTitle">
          <Label id="component.insights.longTitle" />
        </PageLongTitle>
        <Row>
          <Column width={[1, 3 / 4]}>
            <AbovePlots>
              { ready &&
                <SelectWrapper
                  labelID="component.insights.selectSurveyLabel"
                  value={surveyID}
                  options={surveys}
                  onChange={(newValue) => this.onSurveyChange(newValue)}
                  valueKey={'survey_id'}
                  formatOption={(option) => timeFormat('%Y')(new Date(option.get('date')).getTime())}
                />
              }
            </AbovePlots>
          </Column>
        </Row>
        <Row>
          <Column width={[1, 1 / 4]} order={2}>
            <Visible min={0} >
              { this.renderAsideContent(relevantFocusAreas, surveyID) }
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
                        quasiEquals(outcome.get('survey_id'), surveyID)
                        && quasiEquals(outcome.get('indicator_id'), insight.get('indicator_id'))
                      )
                    )}
                    agenciesTotal={parseInt(survey.get('agencies_total'), 10)}
                    focusArea={indicators.find((item) =>
                        quasiEquals(
                          item.get('indicator_id'),
                          insight.getIn(['indicator', 'parent_indicator_id'])
                        )
                      )
                    }
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

PathInsights.propTypes = {
  /** list of all indicators from state */
  indicators: PropTypes.instanceOf(List),
  /** list of all surveys from state */
  surveys: PropTypes.instanceOf(List),
  /** list of all insights from state */
  insights: PropTypes.instanceOf(List),
  /** list of all outcomes from state */
  outcomes: PropTypes.instanceOf(List),
  /** Navigation action */
  nav: PropTypes.func.isRequired,
  /** selected survey id from state */
  surveySelectedId: PropTypes.string,
};

/**
 * Mapping redux state to component props
 *
 * @param {object} state application store
 * @return {object} object of selected store content
 */
const mapStateToProps = (state) => ({
  indicators: selectIndicators(state),
  outcomes: selectOutcomes(state),
  surveys: selectSurveys(state),
  insights: selectInsights(state),
  surveySelectedId: selectSurveyIdFromLocation(state),
});

/**
 * Mapping redux dispatch function to component props
 *
 * @param {function} dispatch redux dispatch function for dispatching actions
 * @return {object} object of functions for dispatching actions
 */
const mapDispatchToProps = (dispatch) => ({
  // navigate to location
  nav: (location) => {
    dispatch(navigate(location));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PathInsights);