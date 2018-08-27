/**
  * Application store selectors
  *
  * @ignore
  */
// vendor
import { createSelector } from 'reselect';
// utils
import quasiEquals from 'utils/quasi-equals';
// constants
import {
  FOCUSAREA_INDICATOR_IDS,
  DEFAULT_SUBJECT_ID,
} from './constants';

/**
 * Select location from store
 * @param {object} state current state
 * @return {object} location
 */
export const selectLocation = (state) => state.get('location');
/**
 * Select announcement message from store
 * @param {object} state current state
 * @return {object} announcement message
 */
export const selectAnnouncement = (state) => state.getIn(['announcement', 'msg']);
/**
 * Select data from store
 * @param {object} state current state
 * @return {object} data
 */
const selectDataState = (state) => state.get('data');
/**
 * Select requested time for data table
 * @param {object} state current state
 * @param {string} key data table name
 * @return {object} data table request time
 */
export const selectRequestedAt = createSelector(
  selectDataState,
  (state, key) => key,
  (data, key) => data.get(key) && data.getIn([key, 'requested'])
);
/**
 * Select any load errors present for data table
 * @param {object} state current state
 * @param {string} key data table name
 * @return {object} data with errors
 */
export const selectDataError = createSelector(
  selectDataState,
  (data) => data.filter((d) => typeof d.get('error') !== 'undefined' && d.get('error') !== null)
);
/**
 * Select data table content
 * @param {object} state current state
 * @param {string} key data table name
 * @return {object} data table content
 */
export const selectData = createSelector(
  selectDataState,
  (state, key) => key,
  (data, key) => data.get(key) && data.getIn([key, 'data'])
);
/**
 * Insert at string into string at position
 * @param {string} s original string
 * @param {string} x string to insert
 * @param {number} at position to insert
 * @return {string} updated string
 */
const insertAt = (s, x, at) => [s.slice(0, at), x, s.slice(at)].join('');
/**
 * Select 'surveys' data table, converts dates to allow for handling different date formats
 * @param {object} state current state
 * @return {object} list of 'surveys'
 */
export const selectSurveys = createSelector(
  (state) => selectData(state, 'surveys'),
  (data) => {
    if (data) {
      // assume YYYYMMDD (initially suggested date format) and convert to YYYY-MM-DD
      return data.map((d) => {
        if (d.get('date').length === 8 && d.get('date').indexOf('-') === -1) {
          const updated = insertAt(insertAt(String(d.get('date')), '-', 6), '-', 4);
          return isNaN(Date.parse(updated)) ? d : d.set('date', updated);
        }
        return d;
      });
    }
    return null;
  }
);
/**
 * Select single survey from 'surveys' data table by attribute
 * @param {object} state current state
 * @param {object} args key: attribute key, value: attribute value
 * @return {object} the survey
 */
export const selectSurvey = createSelector(
  selectSurveys,
  (state, args) => args, // { key, value }
  (data, args) => data && data.find((item) => quasiEquals(item.get(args.key), args.value))
);
/**
 * Select agency count for single survey
 * @param {object} state current state
 * @param {object} value survey id
 * @return {string} number of agencies for given survey
 */
export const selectAgencyCount = createSelector(
  (state, value) => selectSurvey(state, {
    key: 'survey_id',
    value,
  }),
  (data) => data && data.get('agencies_total')
);
/**
 * Select 'subjects'
 * @param {object} state current state
 * @return {object} list of subjects
 */
export const selectSubjects = createSelector(
  (state) => selectData(state, 'subjects'),
  (data) => data
);
/**
 * Select subject id from query
 * @param {object} state current state
 * @return {string} subject id
 */
export const selectSubjectIdFromLocation = createSelector(
  selectLocation,
  (location) => location.getIn(['query', 'subject']) || DEFAULT_SUBJECT_ID
);
/**
 * Select survey id from query
 * @param {object} state current state
 * @return {string} survey id
 */
export const selectSurveyIdFromLocation = createSelector(
  selectLocation,
  (location) => location.getIn(['query', 'survey']) || null
);
/**
 * Select 'indicators'
 * @param {object} state current state
 * @return {object} list of indicators
 */
export const selectIndicators = createSelector(
  (state) => selectData(state, 'indicators'),
  (data) => data
);
/**
 * Select 'focus area indicators'
 * @param {object} state current state
 * @return {object} list of focus area indicators
 */
export const selectFocusAreaIndicators = createSelector(
  selectIndicators,
  (data) => data && data
    .filter((item) => FOCUSAREA_INDICATOR_IDS.indexOf(item.get('indicator_id')) >= 0)
    .sortBy((item) => item.get('indicator_id'))
);
/**
 * Select focus area id from query
 * @param {object} state current state
 * @return {string} focus area id
 */
export const selectFocusAreaIdFromLocation = createSelector(
  selectLocation,
  (location) => location.getIn(['query', 'fa']) || null
);
/**
 * Select 'outcomes'
 * @param {object} state current state
 * @return {object} list of outcomes
 */
export const selectOutcomes = createSelector(
  (state) => selectData(state, 'outcomes'),
  (data) => data
);
/**
 * Select 'insights'
 * @param {object} state current state
 * @return {object} list of insights
 */
export const selectInsights = createSelector(
  (state) => selectData(state, 'insights'),
  (data) => data
);
/**
 * Select 'focus area indicators' joined with 'outcomes'
 * @param {object} state current state
 * @return {object} list of focus area indicators with outcomes
 */
export const selectFocusAreaIndicatorsWithOutcomes = createSelector(
  selectFocusAreaIndicators,
  selectOutcomes,
  (indicators, outcomes) => indicators && outcomes && indicators.map((item) => item.set(
    'outcomes',
    outcomes.filter((outcome) => quasiEquals(outcome.get('indicator_id'), item.get('indicator_id')))
  ))
);
/**
 * Select 'indicators' joined with 'outcomes'
 * @param {object} state current state
 * @return {object} list of indicators with outcomes
 */
export const selectIndicatorsWithOutcomes = createSelector(
  selectIndicators,
  selectOutcomes,
  (indicators, outcomes) => indicators && outcomes && indicators.map((item) => item.set(
    'outcomes',
    outcomes.filter((outcome) => quasiEquals(outcome.get('indicator_id'), item.get('indicator_id')))
  ))
);
