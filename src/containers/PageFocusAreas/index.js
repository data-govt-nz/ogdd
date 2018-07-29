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

import {
  DEFAULT_SUBJECT_ID,
  FOCUSAREA_ICONS,
  FOCUSAREA_COLORICONS,
} from 'containers/App/constants';

// components
import Label from 'components/Label';
import PageTitle from 'components/PageTitle';
import ReadMore from 'components/ReadMore';
import FSModal from 'components/FSModal';
import AsideContent from 'components/AsideContent';
import PlotFocusArea from 'components/PlotFocusArea';

// simple styles (styled components)
import Row from 'styles/Row';
import Column from 'styles/Column';
import PageLongTitle from 'styles/PageLongTitle';
import PageContainer from 'styles/PageContainer';
import Hidden from 'styles/Hidden';
import Visible from 'styles/Visible';

// assets
import titleIcon from 'assets/React-icon.png';
import description from 'labels/focus-areas.md'; // loaded as HTML from markdown

const PageTitleWrapper = styled.div`
  position: relative;
`;

const ReadMoreWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`;

const ReferenceHint = styled.div`
  color: ${(props) => props.theme.colors.referenceLabel};
  font-size: 13px;
  @media (min-width: ${(props) => props.theme.breakpoints[1]}) {
    position: absolute;
    right: 0;
    top: 4px;
  }
`;

const SubjectSelect = styled.div`
  min-height: 40px;
  position: relative;
  width: 100%;
`;

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

  onHighlightSurvey(surveyHighlightedId) {
    this.setState({ surveyHighlightedId });
  }

  onSelectReference(subjectReference) {
    this.props.nav({ query: { subject: subjectReference } });
  }

  onSubjectChange(e) {
    this.props.nav({ query: { subject: e.target.value } });
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
              iconSrc={FOCUSAREA_ICONS[this.state.focusAreaSelected.get('indicator_id')]}
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
      />
    );
  }

  render() {
    const { focusAreaIndicators, surveys, subjects, subjectSelectedId } = this.props;

    // default to last (most recent) survey
    const surveyHighlightedId = this.state.surveyHighlightedId
      || (surveys ? surveys.last().get('survey_id') : null);

    const ready = focusAreaIndicators && subjects && surveys && surveyHighlightedId;

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
            <SubjectSelect>
              { ready && subjects.size > 1 &&
                <div>
                  <label htmlFor="subject-select" >
                    <Label id="component.focus-areas.selectSubjectLabel" />
                  </label>
                  <select
                    id="subject-select"
                    value={subjectSelectedId}
                    onChange={((e) => this.onSubjectChange(e))}
                  >
                    { subjects.map((item) => (
                      <option key={item.get('subject_id')} value={item.get('subject_id')} >
                        { item.get('title') }
                      </option>
                    ))}
                  </select>
                </div>
              }
              { ready && subjects.size === 0 &&
                <div>
                  <Label id="component.focus-areas.selectSubjectLabel" />
                  { subjectSelected.get('title')}
                </div>
              }
              { subjectReference &&
                <ReferenceHint>
                  <Label id="component.focus-areas.subjectReference" />
                  { subjectReference.get('title')}
                </ReferenceHint>
              }
            </SubjectSelect>
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
              { ready &&
                focusAreaIndicators.map((focusArea) => (
                  <Column
                    width={[1, 1 / 2, 1 / 3]}
                    key={focusArea.get('indicator_id')}
                  >
                    <PlotFocusArea
                      focusArea={focusArea}
                      focusAreaIcon={FOCUSAREA_COLORICONS[focusArea.get('indicator_id')]}
                      surveys={surveys}
                      subject={subjectSelected}
                      referenceSubject={subjectReference}
                      onSelectReference={() => subjectReference ? this.onSelectReference(subjectReference.get('subject_id')) : null}
                      surveyHighlightedId={surveyHighlightedId}
                      onHighlightSurvey={(surveyID) => this.onHighlightSurvey(surveyID)}
                      onFAMouseEnter={() => this.onFAMouseEnter(focusArea)}
                      onFAMouseLeave={() => this.onFAMouseLeave()}
                      onFATouch={() => this.onFATouch(focusArea)}
                    />
                  </Column>
                ))
              }
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
