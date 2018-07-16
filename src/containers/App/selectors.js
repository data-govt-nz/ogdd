import { createSelector } from 'reselect';
import attributesEqual from 'utils/attributes-equal';

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
