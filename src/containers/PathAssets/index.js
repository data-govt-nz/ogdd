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

import { ASSETS_INDICATOR_ID_MAP } from 'containers/App/constants';

// components
import Label from 'components/Label';
import PageTitle from 'components/PageTitle';
import ReadMore from 'components/ReadMore';
import FSModal from 'components/FSModal';
import AsideContent from 'components/AsideContent';
import PlotAssets from 'components/PlotAssets';

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
import titleIcon from 'assets/data-assets.svg';
import description from 'text/data-assets.md'; // loaded as HTML from markdown

const PlotTitle = styled.div`
  margin-bottom: 15px;
  font-weight: 600;
`;

const INITIAL_STATE = {
  showModal: false,
  surveyHighlightedId: null, // set from surveys
};

class PathAssets extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
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
      <PageTitle labelId="component.assets.title" iconSrc={titleIcon} />
    );
  }

  renderAsideContent() {
    return (
      <AsideContent
        title={this.renderPageTitle()}
        html={description}
      />
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

    const machineReadableIndicator = ready &&
      indicators.find((item) => quasiEquals(item.get('indicator_id'), ASSETS_INDICATOR_ID_MAP.MACHINEREADABLE_ID));
    const nzgoalIndicator = ready &&
      indicators.find((item) => quasiEquals(item.get('indicator_id'), ASSETS_INDICATOR_ID_MAP.NZGOAL_ID));
    const assetsIndicator = ready &&
      indicators.find((item) => quasiEquals(item.get('indicator_id'), ASSETS_INDICATOR_ID_MAP.ASSETS_ID));

    return (
      <PageContainer>
        <Helmet>
          <title>{getLabel('component.assets.title')}</title>
          <meta
            name="description"
            content={getLabel('component.assets.metaDescription')}
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
          <Label id="component.assets.longTitle" />
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
                <Column
                  width={[1, 1, 1 / 2]}
                >
                  <PlotTitle>{machineReadableIndicator.get('title')}</PlotTitle>
                  <PlotAssets
                    indicator={machineReadableIndicator}
                    referenceIndicator={assetsIndicator}
                    surveys={surveys}
                    surveyHighlightedId={surveyHighlightedId}
                    onHighlightSurvey={(surveyID) => this.onHighlightSurvey(surveyID)}
                    onCardMouseLeave={() => this.onCardMouseLeave()}
                  />
                </Column>
                <Column
                  width={[1, 1, 1 / 2]}
                >
                  <PlotTitle>{nzgoalIndicator.get('title')}</PlotTitle>
                  <PlotAssets
                    indicator={nzgoalIndicator}
                    referenceIndicator={assetsIndicator}
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

PathAssets.propTypes = {
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

export default connect(mapStateToProps)(PathAssets);
