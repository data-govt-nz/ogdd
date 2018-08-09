// vendor
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { List } from 'immutable';

// utils
import getLabel from 'utils/get-label';
import attributesEqual from 'utils/attributes-equal';

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

const NonSelectWrapper = styled.div``;

const INITIAL_STATE = {
  showModal: false,
  surveyHighlightedId: null, // set from surveys
};

class PathFocusAreaSingle extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
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

  onHighlightSurvey(surveyHighlightedId) {
    this.setState({ surveyHighlightedId });
  }

  onSubjectChange(subject) {
    this.props.nav({ query: {
      subject,
      fa: this.props.faSelectedId,
    } });
  }
  onSelectSubject(subjectID) {
    this.props.nav({ query: {
      subject: subjectID,
      fa: this.props.faSelectedId,
    } });
  }
  onFAClose() {
    this.props.nav({
      path: '',
      query: {
        subject: this.props.subjectSelectedId,
      },
    });
  }

  renderPageTitle() {
    return (
      <PageTitle labelId="component.focus-area.title" iconSrc={titleIcon} />
    );
  }

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

    const ready = focusAreaIndicators && faSelectedId && subjects && surveys && surveyHighlightedId !== null;

    const focusArea = ready && (faSelectedId
      ? focusAreaIndicators.find((item) => attributesEqual(item.get('indicator_id'), faSelectedId))
      : focusAreaIndicators.first()
    );

    const subjectSelected = ready && subjects.find((item) =>
      attributesEqual(item.get('subject_id'), subjectSelectedId)
    );
    const subjectsOther = ready && subjects.filter((item) =>
      !attributesEqual(item.get('subject_id'), subjectSelectedId)
      && !attributesEqual(item.get('subject_id'), DEFAULT_SUBJECT_ID)
    );
    const subjectReference = ready && subjectSelectedId !== DEFAULT_SUBJECT_ID
      ? subjects.find((item) => attributesEqual(item.get('subject_id'), DEFAULT_SUBJECT_ID))
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
                    onSelectSubject={(subjectID) => this.onSelectSubject(subjectID)}
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
  focusAreaIndicators: PropTypes.instanceOf(List),
  surveys: PropTypes.instanceOf(List),
  subjects: PropTypes.instanceOf(List),
  nav: PropTypes.func,
  subjectSelectedId: PropTypes.string.isRequired,
  faSelectedId: PropTypes.string,
};

const mapStateToProps = (state) => ({
  focusAreaIndicators: selectFocusAreaIndicatorsWithOutcomes(state),
  surveys: selectSurveys(state),
  subjects: selectSubjects(state),
  subjectSelectedId: selectSubjectIdFromLocation(state),
  faSelectedId: selectFocusAreaIdFromLocation(state),
});

const mapDispatchToProps = (dispatch) => ({
  // navigate to location
  nav: (location) => {
    dispatch(navigate(location));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PathFocusAreaSingle);
