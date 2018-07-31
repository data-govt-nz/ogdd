import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { timeFormat } from 'd3-time-format';

import getLabel from 'utils/get-label';
import attributesEqual from 'utils/attributes-equal';

import { selectSurveys } from 'containers/App/selectors';
import { navigate } from 'containers/App/actions';

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

const AboutLink = styled.button`
  cursor: pointer;
  padding: 0;
  border: 0;
  margin: 0;
  text-decoration: underline;
`;

const SurveyInformation = ({ surveys, surveySelectedId, nav }) => {
  const firstSurvey = surveys && surveys.first();
  const lastSurvey = surveys && surveys.last();
  const currentSurvey = surveys && (surveySelectedId
    ? surveys.find((item) => attributesEqual(item.get('survey_id'), surveySelectedId))
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
  surveys: PropTypes.object,
  surveySelectedId: PropTypes.string,
  nav: PropTypes.func,
};

const mapStateToProps = (state) => ({
  surveys: selectSurveys(state),
});


const mapDispatchToProps = (dispatch) => ({
  // navigate to location
  nav: (location) => {
    dispatch(navigate(location));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SurveyInformation);
