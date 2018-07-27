import { createSelector } from 'reselect';
import attributesEqual from 'utils/attributes-equal';

import { FOCUSAREA_INDICATOR_IDS, DEFAULT_SUBJECT_ID } from './constants';

// const getState = (state) => state;

export const selectLocation = (state) => state.get('location');
export const selectAnnouncement = (state) => state.get('announcement');
const selectDataState = (state) => state.get('data');

export const selectRequestedAt = createSelector(
  selectDataState,
  (state, key) => key,
  (data, key) => data.get(key) && data.getIn([key, 'requested'])
);

export const selectData = createSelector(
  selectDataState,
  (state, key) => key,
  (data, key) => data.get(key) && data.getIn([key, 'data'])
);

// surveys
export const selectSurveys = createSelector(
  (state) => selectData(state, 'surveys'),
  (data) => data
);

export const selectSurvey = createSelector(
  selectSurveys,
  (state, args) => args, // { key, value }
  (data, args) => data && data.find((item) => attributesEqual(item.get(args.key), args.value))
);

export const selectAgencyCount = createSelector(
  (state, value) => selectSurvey(state, {
    key: 'survey_id',
    value,
  }),
  (data) => data && data.get('agencies_total')
);

// subjects
export const selectSubjects = createSelector(
  (state) => selectData(state, 'subjects'),
  (data) => data
);

export const selectSubject = createSelector(
  selectSubjects,
  (state, args) => args, // { key, value }
  (data, args) => data && data.find((item) => attributesEqual(item.get(args.key), args.value))
);

export const selectSubjectIdFromLocation = createSelector(
  selectLocation,
  (location) => location.getIn(['query', 'subject']) || DEFAULT_SUBJECT_ID
);

// indicators
export const selectIndicators = createSelector(
  (state) => selectData(state, 'indicators'),
  (data) => data
);

export const selectIndicator = createSelector(
  selectIndicators,
  (state, args) => args, // { key, value }
  (data, args) => data && data.find((item) => attributesEqual(item.get(args.key), args.value))
);

export const selectFocusAreaIndicators = createSelector(
  selectIndicators,
  (data) => data && data.filter((item) => FOCUSAREA_INDICATOR_IDS.indexOf(item.get('indicator_id')) >= 0)
);

// outcomes
export const selectOutcomes = createSelector(
  (state) => selectData(state, 'outcomes'),
  (data) => data
);

// insights
export const selectInsights = createSelector(
  (state) => selectData(state, 'insights'),
  (data) => data
);

export const selectFocusAreaIndicatorsWithOutcomes = createSelector(
  selectFocusAreaIndicators,
  selectOutcomes,
  (indicators, outcomes) => indicators && outcomes && indicators.map((item) => item.set(
    'outcomes',
    outcomes.filter((outcome) => attributesEqual(outcome.get('indicator_id'), item.get('indicator_id')))
  ))
);
