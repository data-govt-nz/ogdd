/**
  * Description
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
  selectIndicatorsWithOutcomes,
  selectSurveys,
} from 'containers/App/selectors';

import { SERVICES_INDICATOR_ID_MAP } from 'containers/App/constants';
import SurveyInformation from 'containers/SurveyInformation';

// components
import Label from 'components/Label';
import PageTitle from 'components/PageTitle';
import ReadMore from 'components/ReadMore';
import FSModal from 'components/FSModal';
import AsideContent from 'components/AsideContent';
import PlotServices from 'components/PlotServices';
import PlotServicesMultiples from 'components/PlotServicesMultiples';

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
import titleIcon from 'assets/data-services.svg';
import description from 'text/data-services.md'; // loaded as HTML from markdown

const PlotTitle = styled.div`
  margin-bottom: 15px;
  font-weight: 600;
`;

const INITIAL_STATE = {
  showModal: false,
  surveyHighlightedId: null, // set from surveys
};

class PathServices extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
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
  onCardMouseLeave() {
    this.setState({
      surveyHighlightedId: null,
    });
  }
  renderPageTitle() {
    return (
      <PageTitle labelId="component.services.title" iconSrc={titleIcon} />
    );
  }

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

    const surveyHighlightedId = this.state.surveyHighlightedId || (
      this.props.surveys
      ? this.props.surveys.last().get('survey_id')
      : null
    );

    const ready = indicators && surveys && surveyHighlightedId !== null;

    const howIndicator = ready && indicators.find((item) => quasiEquals(item.get('indicator_id'), SERVICES_INDICATOR_ID_MAP.HOW_ID));
    const standardsIndicator = ready && indicators.find((item) => quasiEquals(item.get('indicator_id'), SERVICES_INDICATOR_ID_MAP.STANDARDS_ID));
    const servicesIndicator = ready && indicators.find((item) => quasiEquals(item.get('indicator_id'), SERVICES_INDICATOR_ID_MAP.SERVICES_ID));

    return (
      <PageContainer>
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
          <FSModal dismiss={() => this.onFSModalDismiss()}>
            { this.renderAsideContent() }
          </FSModal>
        }
        <PageLongTitle id="pageTitle">
          <Label id="component.services.longTitle" />
        </PageLongTitle>
        <Row>
          <Column width={[1, 1 / 4]} order={2} paddingtop={10}>
            <Visible min={0} >
              { this.renderAsideContent() }
            </Visible>
          </Column>
          <Column width={[1, 3 / 4]} order={1}>
            { ready &&
              <Row>
                <Column width={[1, 1, 1 / 2]}>
                  <PlotTitle>{howIndicator.get('title')}</PlotTitle>
                  <PlotServices
                    indicator={howIndicator}
                    surveys={surveys}
                    surveyHighlightedId={surveyHighlightedId}
                    onHighlightSurvey={(surveyID) => this.onHighlightSurvey(surveyID)}
                    onCardMouseLeave={() => this.onCardMouseLeave()}
                  />
                </Column>
                <Column width={[1, 1, 1 / 2]}>
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
                <Column width={[1]}>
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
      </PageContainer>
    );
  }
}

PathServices.propTypes = {
  indicators: PropTypes.instanceOf(List),
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
