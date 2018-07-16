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
    data: [],
    requested: null,
    source: 'json',
    path: 'data/',
    filename: 'surveys.json',
  },    // id,survey_id,date,agencies_total
  subjects: {
    data: [],
    requested: null,
    source: 'json',
    path: 'data/',
    filename: 'subjects.json',
  },   // id,title
  indicators: {
    data: [],
    requested: null,
    source: 'json',
    path: 'data/',
    filename: 'indicators.json',
  }, // id,indicator_id,type,question_no,title,description
  insights: {
    data: [],
    requested: null,
    source: 'json',
    path: 'data/',
    filename: 'insights.json',
  },   // id,survey_id,value,text,indicator_id,outcome_answers
  outcomes: {
    data: [],
    requested: null,
    source: 'json',
    path: 'data/',
    filename: 'outcomes.json',
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

export const BREAKPOINTS = {
  SMALL: 0,
  MEDIUM: 1,
};

const constants = {
  NAVITEMS,
  BREAKPOINTS,
};
export default constants;
