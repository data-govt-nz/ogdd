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
  selectFocusAreaIdFromLocation,
} from 'containers/App/selectors';
import { navigate } from 'containers/App/actions';

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
import PlotFocusAreaDetails from 'components/PlotFocusAreaDetails';

// simple styles (styled components)
import Row from 'styles/Row';
import Column from 'styles/Column';
import PageLongTitle from 'styles/PageLongTitle';
import PageContainer from 'styles/PageContainer';
import Hidden from 'styles/Hidden';
import Visible from 'styles/Visible';
import PageTitleWrapper from 'styles/PageTitleWrapper';
import ReadMoreWrapper from 'styles/ReadMoreWrapper';

// assets
import titleIcon from 'assets/focus-areas.svg';

const SubjectSelect = styled.div`
  min-height: 40px;
  position: relative;
  width: 100%;
`;


const INITIAL_STATE = {
  showModal: false,
  surveyHighlightedId: null, // set from surveys
};

class PageFocusAreaSingle extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
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

  onSubjectChange(e) {
    this.props.nav({ query: {
      subject: e.target.value,
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
      <PageTitle title="component.focus-area.title" iconSrc={titleIcon} />
    );
  }

  renderAsideContent(focusArea) {
    return focusArea && (
      <AsideContent
        title={
          <PageTitle
            title={focusArea.get('title')}
            iconSrc={FOCUSAREA_DARKICONS[focusArea.get('indicator_id')]}
          />
        }
        text={focusArea.get('description')}
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
            <SubjectSelect>
              { ready && subjects.size > 1 &&
                <div>
                  <label htmlFor="subject-select" >
                    <Label id="component.focus-area.selectSubjectLabel" />
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
                  <Label id="component.focus-area.selectSubjectLabel" />
                  { subjectSelected.get('title')}
                </div>
              }
            </SubjectSelect>
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

PageFocusAreaSingle.propTypes = {
  focusAreaIndicators: PropTypes.object,
  surveys: PropTypes.object,
  subjects: PropTypes.object,
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

export default connect(mapStateToProps, mapDispatchToProps)(PageFocusAreaSingle);
