/**
  * The single focus area component - only available when results for multiple agencies published
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
  selectFocusAreaIdFromLocation,
} from 'containers/App/selectors';
import { navigate } from 'containers/App/actions';
import {
  DEFAULT_SUBJECT_ID,
  FOCUSAREA_ICONS,
} from 'containers/App/constants';
// components
import Label from 'components/Label';
import PageTitle from 'components/PageTitle';
import ReadMore from 'components/ReadMore';
import FSModal from 'components/FSModal';
import AsideContent from 'components/AsideContent';
import PlotFocusAreaDetails from 'components/PlotFocusAreaDetails';
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

// own styles
const NonSelectWrapper = styled.div``;

// initial component state
const INITIAL_STATE = {
  showModal: false, // show/hide modal
  surveyHighlightedId: null, // highlighted survey
};

class PathFocusAreaSingle extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
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
    * 'Highlight survey' handler - highlights survey in plot
    * @param {string} surveyHighlightedId the survey to highlight
    */
  onHighlightSurvey(surveyHighlightedId) {
    this.setState({ surveyHighlightedId });
  }
  /**
    * 'Subject change' select handler - adds subject id to router query
    * @param {string} subject subject id
    */
  onSubjectChange(subject) {
    this.props.nav({ query: {
      subject,
      fa: this.props.faSelectedId,
    } });
  }
  /**
    * 'Close component' handler - triggers navigation to focus area overview
    * Retains selected subject.
    */
  onFAClose() {
    this.props.nav({
      path: '',
      query: {
        subject: this.props.subjectSelectedId,
      },
    });
  }
  /**
    * Render page title
    * @return {Component} Page title component
    */
  renderPageTitle() {
    return (
      <PageTitle labelId="component.focus-area.title" iconSrc={titleIcon} />
    );
  }
  /**
    * Render sidebar content
    * @param {object} focusArea the current focus area
    * @return {Component} Aside component
    */
  renderAsideContent(focusArea) {
    return focusArea && (
      <AsideContent
        title={this.renderPageTitle()}
        text={`${focusArea.get('title').trim()}: ${focusArea.get('description')}`}
      />
    );
  }

  render() {
    const { focusAreaIndicators, surveys, subjects, subjectSelectedId, faSelectedId } = this.props;

    // default to last (most recent) survey
    const surveyHighlightedId = this.state.surveyHighlightedId
    || (surveys ? surveys.last().get('survey_id') : null);
    // check if all data is available
    const ready = focusAreaIndicators && faSelectedId && subjects && surveys && surveyHighlightedId !== null;
    // figure out current focus area
    const focusArea = ready && (faSelectedId
      ? focusAreaIndicators.find((item) => quasiEquals(item.get('indicator_id'), faSelectedId))
      : focusAreaIndicators.first()
    );
    // find current subject/agency
    const subjectSelected = ready && subjects.find((item) =>
      quasiEquals(item.get('subject_id'), subjectSelectedId)
    );
    // all other subjects/agencies for comparison
    const subjectsOther = ready && subjects.filter((item) =>
      !quasiEquals(item.get('subject_id'), subjectSelectedId)
      && !quasiEquals(item.get('subject_id'), DEFAULT_SUBJECT_ID)
    );
    // the reference subject "All of Government"
    const subjectReference = ready && subjectSelectedId !== DEFAULT_SUBJECT_ID
      ? subjects.find((item) => quasiEquals(item.get('subject_id'), DEFAULT_SUBJECT_ID))
      : null;

    return (
      <PageContainer>
        <Helmet>
          <title>
            {`${getLabel('component.focus-area.title')}: ${ready && focusArea.get('title')}`}
          </title>
          <meta
            name="description"
            content={getLabel('component.focus-area.metaDescription')}
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
            { this.renderAsideContent(ready && focusArea) }
          </FSModal>
        }
        {ready &&
          <PageLongTitle id="pageTitle">
            <Label id="component.focus-areas.longTitle" />
          </PageLongTitle>
        }
        <Row>
          <Column width={[1, 3 / 4]}>
            <AbovePlots>
              { ready && subjects.size > 1 &&
                <SelectWrapper
                  labelID="component.focus-area.selectSubjectLabel"
                  value={subjectSelectedId}
                  options={subjects}
                  onChange={(newValue) => this.onSubjectChange(newValue)}
                  valueKey={'subject_id'}
                  formatOption={(option) => option.get('title')}
                />
              }
              { ready && subjects.size === 0 &&
                <NonSelectWrapper>
                  <Label id="component.focus-areas.selectSubjectLabel" />
                  { subjectSelected.get('title')}
                </NonSelectWrapper>
              }
            </AbovePlots>
          </Column>
        </Row>
        <Row>
          <Column width={[1, 1 / 4]} order={2}>
            <Visible min={0} >
              { this.renderAsideContent(ready && focusArea) }
            </Visible>
          </Column>
          <Column width={[1, 3 / 4]} order={1}>
            <Row>
              { ready &&
                <Column width={[1]}>
                  <PlotFocusAreaDetails
                    focusArea={focusArea}
                    surveys={surveys}
                    subject={subjectSelected}
                    otherSubjects={subjectsOther}
                    referenceSubject={subjectReference}
                    onSelectSubject={(subjectID) => this.onSubjectChange(subjectID)}
                    surveyHighlightedId={surveyHighlightedId}
                    onHighlightSurvey={(surveyID) => this.onHighlightSurvey(surveyID)}
                    onDismiss={() => this.onFAClose()}
                    focusAreaIcon={FOCUSAREA_ICONS[faSelectedId]}
                  />
                </Column>
              }
            </Row>
          </Column>
        </Row>
      </PageContainer>
    );
  }
}

PathFocusAreaSingle.propTypes = {
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
  faSelectedId: PropTypes.string,
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
  faSelectedId: selectFocusAreaIdFromLocation(state),
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

export default connect(mapStateToProps, mapDispatchToProps)(PathFocusAreaSingle);
