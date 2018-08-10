/**
  * Description
  *
  * @author [tmfrnz](https://github.com/tmfrnz)
  */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { List } from 'immutable';
import { timeFormat } from 'd3-time-format';

import getLabel from 'utils/get-label';
import quasiEquals from 'utils/quasi-equals';

import { selectSurveys } from 'containers/App/selectors';
import { navigate } from 'containers/App/actions';

import Link from 'styles/Link';

// components
import Label from 'components/Label';


const Styled = styled.div`
  margin-top: 30px;
`;
const Title = styled.div`
  font-weight: bold;
`;
const CurrentSurveyInfo = styled.div``;
const AboutLinkWrapper = styled.div``;
const AboutLink = styled(Link)``;

const SurveyInformation = ({ surveys, surveySelectedId, nav }) => {
  const firstSurvey = surveys && surveys.first();
  const lastSurvey = surveys && surveys.last();
  const currentSurvey = surveys && (surveySelectedId
    ? surveys.find((item) => quasiEquals(item.get('survey_id'), surveySelectedId))
    : lastSurvey);

  return (
    <Styled>
      <Title>
        <Label id="component.surveyInformation.title" />
      </Title>
      <Title>
        { surveys && `${
            timeFormat('%Y')(new Date(firstSurvey.get('date')).getTime())
          }-${
            timeFormat('%Y')(new Date(lastSurvey.get('date')).getTime())
          }`
         }
      </Title>
      <CurrentSurveyInfo>
        { surveys && `${
            currentSurvey.get('agencies_total')
          } ${
            getLabel('component.surveyInformation.current')
          } ${
            timeFormat('%Y')(new Date(currentSurvey.get('date')).getTime())
          }`
        }
      </CurrentSurveyInfo>
      <AboutLinkWrapper>
        <Label id="component.surveyInformation.aboutLink.before" />
        <AboutLink
          onClick={() => nav('about')}
          title={getLabel('component.about.nav')}
        >
          <Label id="component.about.nav" />
        </AboutLink>
        <Label id="component.surveyInformation.aboutLink.after" />
      </AboutLinkWrapper>
    </Styled>
  );
};

SurveyInformation.propTypes = {
  /** Description */
  surveys: PropTypes.instanceOf(List),
  /** Description */
  surveySelectedId: PropTypes.string,
  /** Description */
  nav: PropTypes.func,
};

/**
 * Mapping redux state to component props
 *
 * @param {object} state application store
 * @return {object} object of selected store content
 */
const mapStateToProps = (state) => ({
  surveys: selectSurveys(state),
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

export default connect(mapStateToProps, mapDispatchToProps)(SurveyInformation);
