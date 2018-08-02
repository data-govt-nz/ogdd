// vendor
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import styled from 'styled-components';

// utils
import getLabel from 'utils/get-label';
import attributesEqual from 'utils/attributes-equal';

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
import description from 'labels/focus-areas.md'; // loaded as HTML from markdown

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

const INITIAL_STATE = {
  showModal: false,
  focusAreaSelected: null,
  surveyHighlightedId: null, // set from surveys
};

class PageFocusAreas extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  onReadMore(showModal = true) {
    this.setState({ showModal });
  }
  onFSModalDismiss() {
    this.setState({
      focusAreaSelected: null,
      showModal: false,
    });
  }
  onFAMouseEnter(focusAreaSelected) {
    this.setState({ focusAreaSelected });
  }
  onFAMouseLeave() {
    this.setState({
      focusAreaSelected: null,
      surveyHighlightedId: null,
    });
  }
  onFATouch(focusAreaSelected) {
    this.setState({ focusAreaSelected, showModal: true });
  }
  onFAClick(fa) {
    this.props.nav({
      path: 'focusarea',
      query: {
        fa,
        subject: this.props.subjectSelectedId || DEFAULT_SUBJECT_ID,
      },
    });
  }

  onHighlightSurvey(surveyHighlightedId) {
    this.setState({ surveyHighlightedId });
  }

  onSelectReference(subjectReference) {
    this.props.nav({ query: { subject: subjectReference } });
  }

  onSubjectChange(subject) {
    this.props.nav({ query: { subject } });
  }

  renderPageTitle() {
    return (
      <PageTitle labelId="component.focus-areas.title" iconSrc={titleIcon} />
    );
  }

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

    const ready = focusAreaIndicators && subjects && surveys && surveyHighlightedId !== null;

    const subjectSelected = ready && subjects.find((item) => attributesEqual(item.get('subject_id'), subjectSelectedId));
    const subjectReference = ready && subjectSelectedId !== DEFAULT_SUBJECT_ID
      ? subjects.find((item) => attributesEqual(item.get('subject_id'), DEFAULT_SUBJECT_ID))
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
                    onSelectReference={() => subjectReference ? this.onSelectReference(subjectReference.get('subject_id')) : null}
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

PageFocusAreas.propTypes = {
  focusAreaIndicators: PropTypes.object,
  surveys: PropTypes.object,
  subjects: PropTypes.object,
  nav: PropTypes.func,
  subjectSelectedId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  focusAreaIndicators: selectFocusAreaIndicatorsWithOutcomes(state),
  surveys: selectSurveys(state),
  subjects: selectSubjects(state),
  subjectSelectedId: selectSubjectIdFromLocation(state),
});

const mapDispatchToProps = (dispatch) => ({
  // navigate to location
  nav: (location) => {
    dispatch(navigate(location));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PageFocusAreas);
