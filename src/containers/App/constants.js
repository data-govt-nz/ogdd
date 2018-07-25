// update location in store
export const LOCATION_UPDATE = 'action.LOCATION_UPDATE';
// update location in URL
export const NAVIGATE = 'action.NAVIGATE';
export const LOAD_DATA = 'action.LOAD_DATA';
export const DATA_REQUESTED = 'action.DATA_REQUESTED';
export const DATA_LOADED = 'action.DATA_LOADED';
export const LOAD_ERROR = 'action.LOAD_ERROR';

export const DATA = {
  surveys: {
    data: null,
    requested: null,
    source: 'csv',
    path: 'data/',
    filename: 'surveys.csv',
  },    // id,survey_id,date,agencies_total
  subjects: {
    data: null,
    requested: null,
    source: 'csv',
    path: 'data/',
    filename: 'subjects.csv',
  },   // id,title
  indicators: {
    data: null,
    requested: null,
    source: 'csv',
    path: 'data/',
    filename: 'indicators.csv',
  }, // id,indicator_id,type,question_no,title,description
  insights: {
    data: null,
    requested: null,
    source: 'csv',
    path: 'data/',
    filename: 'insights.csv',
  },   // id,survey_id,value,text,indicator_id,outcome_answers
  outcomes: {
    data: null,
    requested: null,
    source: 'csv',
    path: 'data/',
    filename: 'outcomes.csv',
  },   // id,survey_id,subject_id,indicator_id,value,answer,answer_text
};

export const NAVITEMS = [
  {
    path: '',
    label: 'component.focus-areas.nav',
  },
  {
    path: 'insights',
    label: 'component.insights.nav',
  },
  {
    path: 'services',
    label: 'component.services.nav',
  },
  {
    path: 'assets',
    label: 'component.assets.nav',
  },
];

export const FOCUSAREA_INDICATOR_IDS = [
  'fa1', 'fa2', 'fa3', 'fa4', 'fa5', 'fa6',
];

export const DEFAULT_SUBJECT_ID = 'all';

export const BREAKPOINTS = {
  SMALL: 0,
  MEDIUM: 1,
};

const constants = {
  NAVITEMS,
  BREAKPOINTS,
};
export default constants;
