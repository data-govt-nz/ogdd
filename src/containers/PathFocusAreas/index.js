/**
  * 'All focus areas' overview component
  * Shows focus area details on hover when only 1 subject (all of governemnt present) -
  * otherwise allows selecting focus area for detailed view
  *
  * @author [tmfrnz](https://github.com/tmfrnz)
  */
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
  selectFocusAreaIndicatorsWithOutcomes,
  selectSurveys,
  selectSubjects,
  selectSubjectIdFromLocation,
} from 'containers/App/selectors';
import { navigate } from 'containers/App/actions';
import SurveyInformation from 'containers/SurveyInformation';
import {
  DEFAULT_SUBJECT_ID,
  FOCUSAREA_ICONS,
  FOCUSAREA_DARKICONS,
} from 'containers/App/constants';
// components
import Label from 'components/Label';
import PageTitle from 'components/PageTitle';
import ReadMore from 'components/ReadMore';
import FSModal from 'components/FSModal';
import AsideContent from 'components/AsideContent';
import PlotFocusArea from 'components/PlotFocusArea';
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
import titleIcon from 'assets/focus-areas.svg';
import description from 'text/focus-areas.md'; // loaded as HTML from markdown

// component styles
const ReferenceHint = styled.div`
  color: ${(props) => props.theme.colors.referenceLabel};
  font-size: 13px;
  margin-top: 10px;
  margin-bottom: 10px;
  @media (min-width: ${(props) => props.theme.breakpoints[1]}) {
    margin-top: 0;
    margin-bottom: 0;
    position: absolute;
    right: 0;
    top: 4px;
  }
`;
const NonSelectWrapper = styled.div``;

// initial component state
const INITIAL_STATE = {
  showModal: false, // show/hide modal
  focusAreaSelected: null, // highlighted focus area
  surveyHighlightedId: null, // highlighted survey
};

class PathFocusAreas extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
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
      focusAreaSelected: null,
      showModal: false,
    });
  }
  /**
    * 'Focus area' mouse enter handler - displays focus area information in sidebar
    * only available for single subject
    * @param {string} focusAreaSelected the focus area to highlight and show
    */
  onFAMouseEnter(focusAreaSelected) {
    this.setState({ focusAreaSelected });
  }
  /**
    * 'Focus area' mouse leave handler - displays component information in sidebar
    * only available for single subject
    */
  onFAMouseLeave() {
    this.setState({
      focusAreaSelected: null,
      surveyHighlightedId: null,
    });
  }
  /**
    * 'Focus area' touch handler - displays focus area information in modal
    * only available for single subject
    * @param {string} focusAreaSelected the focus area to highlight and show
    */
  onFATouch(focusAreaSelected) {
    this.setState({ focusAreaSelected, showModal: true });
  }
  /**
    * 'Focus area' click handler - opens focus area detail view, retains current subject
    * only available for multiple subjects
    * @param {string} fa the focus area to navigate to
    */
  onFAClick(fa) {
    this.props.nav({
      path: 'focus-area',
      query: {
        fa,
        subject: this.props.subjectSelectedId || DEFAULT_SUBJECT_ID,
      },
    });
  }
  /**
    * 'Highlight survey' handler - highlights survey in plot
    * @param {string} surveyHighlightedId the survey to highlight
    */
  onHighlightSurvey(surveyHighlightedId) {
    this.setState({ surveyHighlightedId });
  }
  /**
    * 'Subject change' handler - adds subject to query
    * only available for multiple subjects
    * @param {string} subject the selected subject
    */
  onSubjectChange(subject) {
    this.props.nav({ query: { subject } });
  }
  /**
    * Render page title
    * @return {Component} Page title component
    */
  renderPageTitle() {
    return (
      <PageTitle labelId="component.focus-areas.title" iconSrc={titleIcon} />
    );
  }
  /**
    * Render sidebar content
    */
  renderAsideContent() {
    if (this.state.focusAreaSelected) {
      return (
        <AsideContent
          title={
            <PageTitle
              title={this.state.focusAreaSelected.get('title')}
              iconSrc={FOCUSAREA_DARKICONS[this.state.focusAreaSelected.get('indicator_id')]}
            />
          }
          text={this.state.focusAreaSelected.get('description')}
        />
      );
    }
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
    const { focusAreaIndicators, surveys, subjects, subjectSelectedId } = this.props;

    // default to last (most recent) survey
    const surveyHighlightedId = this.state.surveyHighlightedId
      || (surveys ? surveys.last().get('survey_id') : null);
    // check if all data is available
    const ready = focusAreaIndicators && subjects && surveys && surveyHighlightedId !== null;
    // the current subject
    const subjectSelected = ready && subjects.find((item) => quasiEquals(item.get('subject_id'), subjectSelectedId));
    // the current reference subject if other than default subject is selected
    const subjectReference = ready && subjectSelectedId !== DEFAULT_SUBJECT_ID
      ? subjects.find((item) => quasiEquals(item.get('subject_id'), DEFAULT_SUBJECT_ID))
      : null;

    return (
      <PageContainer>
        <Helmet>
          <title>{getLabel('component.focus-areas.title')}</title>
          <meta
            name="description"
            content={getLabel('component.focus-areas.metaDescription')}
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
          <Label id="component.focus-areas.longTitle" />
        </PageLongTitle>
        <Row>
          <Column width={[1, 3 / 4]}>
            <AbovePlots>
              { ready && subjects.size > 1 &&
                <SelectWrapper
                  labelID="component.focus-areas.selectSubjectLabel"
                  value={subjectSelectedId}
                  options={subjects}
                  onChange={(newValue) => this.onSubjectChange(newValue)}
                  valueKey={'subject_id'}
                  formatOption={(option) => option.get('title')}
                />
              }
              { ready && subjects.size === 1 &&
                <NonSelectWrapper>
                  <Label id="component.focus-areas.selectSubjectLabel" />
                  <strong>{ subjectSelected.get('title')}</strong>
                </NonSelectWrapper>
              }
              { subjectReference &&
                <ReferenceHint>
                  <Label id="component.focus-areas.subjectReference" />
                  <strong>{ subjectReference.get('title')}</strong>
                </ReferenceHint>
              }
            </AbovePlots>
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
              { ready && focusAreaIndicators.map((focusArea) => (
                <Column
                  width={[1, 1 / 2, 1 / 3]}
                  key={focusArea.get('indicator_id')}
                >
                  <PlotFocusArea
                    focusArea={focusArea}
                    focusAreaIcon={FOCUSAREA_ICONS[focusArea.get('indicator_id')]}
                    surveys={surveys}
                    subject={subjectSelected}
                    referenceSubject={subjectReference}
                    onSelectReference={() => subjectReference ? this.onSubjectChange(subjectReference.get('subject_id')) : null}
                    surveyHighlightedId={surveyHighlightedId}
                    onHighlightSurvey={(surveyID) => this.onHighlightSurvey(surveyID)}
                    onFAMouseEnter={subjects.size === 1 ? () => this.onFAMouseEnter(focusArea) : null}
                    onFAMouseLeave={subjects.size === 1 ? () => this.onFAMouseLeave() : null}
                    onFATouch={subjects.size === 1 ? () => this.onFATouch(focusArea) : null}
                    onFAClick={subjects.size > 1 ? () => this.onFAClick(focusArea.get('indicator_id')) : null}
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

PathFocusAreas.propTypes = {
  /** list of focus area indicators joined with outcomes from state */
  focusAreaIndicators: PropTypes.instanceOf(List),
  /** list of all surveys from state */
  surveys: PropTypes.instanceOf(List),
  /** list of all subjects/agencies from state */
  subjects: PropTypes.instanceOf(List),
  /** Navigation action */
  nav: PropTypes.func.isRequired,
  /** selected survey id from state */
  subjectSelectedId: PropTypes.string.isRequired,
  /** selected focuas area id from state */
};

/**
 * Mapping redux state to component props
 *
 * @param {object} state application store
 * @return {object} object of selected store content
 */
const mapStateToProps = (state) => ({
  focusAreaIndicators: selectFocusAreaIndicatorsWithOutcomes(state),
  surveys: selectSurveys(state),
  subjects: selectSubjects(state),
  subjectSelectedId: selectSubjectIdFromLocation(state),
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

export default connect(mapStateToProps, mapDispatchToProps)(PathFocusAreas);
