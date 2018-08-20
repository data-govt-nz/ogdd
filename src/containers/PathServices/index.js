// vendor
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { List } from 'immutable';
// utils
import getLabel from 'utils/get-label';
import quasiEquals from 'utils/quasi-equals';
// containers, app selectors, metaDescription
import {
  selectIndicatorsWithOutcomes,
  selectSurveys,
} from 'containers/App/selectors';
import { SERVICES_INDICATOR_ID_MAP } from 'containers/App/constants';
import SurveyInformation from 'containers/SurveyInformation';
// components
import Label from 'components/Label';
import PageTitle from 'components/PageTitle';
import ReadMore from 'components/ReadMore';
import FullScreenModal from 'components/FullScreenModal';
import AsideContent from 'components/AsideContent';
import PlotServices from 'components/PlotServices';
import PlotServicesMultiples from 'components/PlotServicesMultiples';
import Loading from 'components/Loading';
// simple styles (styled components)
import Row from 'styles/Row';
import Column from 'styles/Column';
import PageLongTitle from 'styles/PageLongTitle';
import ContentContainer from 'styles/ContentContainer';
import Hidden from 'styles/Hidden';
import Visible from 'styles/Visible';
import PageTitleWrapper from 'styles/PageTitleWrapper';
import ReadMoreWrapper from 'styles/ReadMoreWrapper';
import PrintOnly from 'styles/PrintOnly';

// assets: icon and description
import description from 'text/data-services.md'; // loaded as HTML from markdown

// component styles
const PlotTitle = styled.div`
  margin-bottom: 15px;
  font-weight: 600;
`;

// initial component state
const INITIAL_STATE = {
  showModal: false, // show/hide modal
  surveyHighlightedId: null, // highlighted survey
};

/**
  * The 'data services' component.
  * Shows description and displays plots for services indicators:
  * - How are assets published?
  * - Is API open standards based?
  * - What API services are used?
  *
  * @return {Component} Data services component
  *
  */
class PathServices extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
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
  onModalDismiss() {
    this.setState({ showModal: false });
  }
  /**
    * 'Highlight survey' handler - highlights survey in plot
    * @param {string} surveyHighlightedId the survey to highlight
    */
  onHighlightSurvey(surveyHighlightedId) {
    this.setState({ surveyHighlightedId });
  }
  /**
    * 'Card' mouse leave handler - resets highlighted survey, defaults to last
    */
  onCardMouseLeave() {
    this.setState({ surveyHighlightedId: null });
  }
  /**
    * Render page title
    * @return {Component} Page title component
    */
  renderPageTitle() {
    return (
      <PageTitle labelId="component.services.title" icon="services" />
    );
  }
  /**
    * Render sidebar content
    * @return {Component} Aside component
    */
  renderAsideContent() {
    return (
      <AsideContent
        title={this.renderPageTitle()}
        html={description}
      >
        <SurveyInformation />
      </AsideContent>
    );
  }

  render() {
    const { indicators, surveys } = this.props;

    // figure out highlighted survey from state or default to last survey
    const surveyHighlightedId = this.state.surveyHighlightedId || (
      this.props.surveys
      ? this.props.surveys.last().get('survey_id')
      : null
    );

    // check if all data is available
    const ready = indicators && surveys && surveyHighlightedId !== null;

    // Plot 1 indicator: how are assets published
    const howIndicator = ready && indicators.find((item) => quasiEquals(item.get('indicator_id'), SERVICES_INDICATOR_ID_MAP.HOW_ID));
    // Plot 2 indicator: is API open standards based
    const standardsIndicator = ready && indicators.find((item) => quasiEquals(item.get('indicator_id'), SERVICES_INDICATOR_ID_MAP.STANDARDS_ID));
    // Plot 3 indicator: what API servicfes are being used
    const servicesIndicator = ready && indicators.find((item) => quasiEquals(item.get('indicator_id'), SERVICES_INDICATOR_ID_MAP.SERVICES_ID));

    return (
      <ContentContainer>
        <Helmet>
          <title>{getLabel('component.services.title')}</title>
          <meta
            name="description"
            content={getLabel('component.services.metaDescription')}
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
          <FullScreenModal dismiss={() => this.onModalDismiss()}>
            { this.renderAsideContent() }
          </FullScreenModal>
        }
        <PrintOnly>
          { this.renderAsideContent() }
        </PrintOnly>
        <PageLongTitle id="pageTitle">
          <Label id="component.services.longTitle" />
        </PageLongTitle>
        <Row>
          <Column width={[1, 1 / 4]} order={2} >
            <Visible min={0} print="false">
              { this.renderAsideContent() }
            </Visible>
          </Column>
          <Column width={[1, 3 / 4]} order={1}>
            { !ready &&
              <Loading />
            }
            { ready &&
              <Row>
                <Column width={[1, 1, 1 / 2]} paddingvertical="true">
                  <PlotTitle>{howIndicator.get('title')}</PlotTitle>
                  <PlotServices
                    indicator={howIndicator}
                    surveys={surveys}
                    surveyHighlightedId={surveyHighlightedId}
                    onHighlightSurvey={(surveyID) => this.onHighlightSurvey(surveyID)}
                    onCardMouseLeave={() => this.onCardMouseLeave()}
                  />
                </Column>
                <Column width={[1, 1, 1 / 2]} paddingvertical="true">
                  <PlotTitle>{standardsIndicator.get('title')}</PlotTitle>
                  <PlotServices
                    indicator={standardsIndicator}
                    surveys={surveys}
                    surveyHighlightedId={surveyHighlightedId}
                    onHighlightSurvey={(surveyID) => this.onHighlightSurvey(surveyID)}
                    onCardMouseLeave={() => this.onCardMouseLeave()}
                  />
                </Column>
              </Row>
            }
            { ready &&
              <Row>
                <Column width={[1]} paddingvertical="true">
                  <PlotTitle>{servicesIndicator.get('title')}</PlotTitle>
                  <PlotServicesMultiples
                    indicator={servicesIndicator}
                    surveys={surveys}
                    surveyHighlightedId={surveyHighlightedId}
                    onHighlightSurvey={(surveyID) => this.onHighlightSurvey(surveyID)}
                    onCardMouseLeave={() => this.onCardMouseLeave()}
                  />
                </Column>
              </Row>
            }
          </Column>
        </Row>
      </ContentContainer>
    );
  }
}

PathServices.propTypes = {
  /** list of all indicators joined with outcomes from state */
  indicators: PropTypes.instanceOf(List),
  /** list of all surveys from state */
  surveys: PropTypes.instanceOf(List),
};

/**
 * Mapping redux state to component props
 *
 * @param {object} state application store
 * @return {object} object of selected store content
 */
const mapStateToProps = (state) => ({
  indicators: selectIndicatorsWithOutcomes(state),
  surveys: selectSurveys(state),
});

export default connect(mapStateToProps)(PathServices);
