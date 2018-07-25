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
} from 'containers/App/selectors';

import { DEFAULT_SUBJECT_ID } from 'containers/App/constants';

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

const FOCUSAREA_ICONS = {
  fa1: titleIcon,
  fa2: titleIcon,
  fa3: titleIcon,
  fa4: titleIcon,
  fa5: titleIcon,
  fa6: titleIcon,
};
const FOCUSAREA_COLORICONS = {
  fa1: titleIcon,
  fa2: titleIcon,
  fa3: titleIcon,
  fa4: titleIcon,
  fa5: titleIcon,
  fa6: titleIcon,
};

const INITIAL_STATE = {
  showModal: false,
  focusAreaSelected: null,
  surveyHighlightedId: null, // set from surveys
  subjectSelectedId: DEFAULT_SUBJECT_ID,
};

const PageTitleWrapper = styled.div`
  position: relative;
`;

const ReadMoreWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`;

class PageFocusAreas extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentDidUpdate(prevProps) {
    if (this.props.surveys && this.props.surveys !== prevProps.surveys) {
      this.setState({ // eslint-disable-line react/no-did-update-set-state
        surveyHighlightedId: this.props.surveys.last().get('survey_id'),
      });
    }
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
    this.setState({ focusAreaSelected: null });
  }
  onFATouch(focusAreaSelected) {
    this.setState({ focusAreaSelected, showModal: true });
  }

  onHighlightSurvey(surveyHighlightedId) {
    this.setState({ surveyHighlightedId });
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
    const { focusAreaIndicators, surveys, subjects } = this.props;

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
          <Column width={[1, 1 / 4]} order={2}>
            <Visible min={0} >
              { this.renderAsideContent() }
            </Visible>
          </Column>
          <Column width={[1, 3 / 4]} order={1}>
            <Row>
              { focusAreaIndicators && subjects && surveys &&
                focusAreaIndicators.map((focusArea) => (
                  <Column
                    width={[1, 1 / 2, 1 / 3]}
                    key={focusArea.get('indicator_id')}
                  >
                    <PlotFocusArea
                      focusArea={focusArea}
                      focusAreaIcon={FOCUSAREA_COLORICONS[focusArea.get('indicator_id')]}
                      surveys={surveys}
                      subject={subjects.find((item) => attributesEqual(item.get('subject_id'), this.state.subjectSelectedId))}
                      surveyHighlightedId={this.state.surveyHighlightedId}
                      onHighlightSurvey={this.onHighlightSurvey}
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
};

const mapStateToProps = (state) => ({
  focusAreaIndicators: selectFocusAreaIndicatorsWithOutcomes(state),
  surveys: selectSurveys(state),
  subjects: selectSubjects(state),
});

export default connect(mapStateToProps)(PageFocusAreas);
