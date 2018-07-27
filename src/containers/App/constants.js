// update location in store
export const LOCATION_UPDATE = 'action.LOCATION_UPDATE';
// update location in URL
export const NAVIGATE = 'action.NAVIGATE';
export const LOAD_DATA = 'action.LOAD_DATA';
export const DATA_REQUESTED = 'action.DATA_REQUESTED';
export const DATA_LOADED = 'action.DATA_LOADED';
export const LOAD_ERROR = 'action.LOAD_ERROR';


const API_PATH = 'https://uat.data.govt.nz/api/3/action/datastore_search';

const API = false;

export const DATA = API
? {
  surveys: {
    data: null,
    requested: null,
    source: 'api',
    path: API_PATH,
    resourceId: 'e964dae4-f912-4ad1-9c90-eeefed2d0168',
  },    // id,survey_id,date,agencies_total
  subjects: {
    data: null,
    requested: null,
    source: 'api',
    path: API_PATH,
    resourceId: '178581f7-695f-4b77-8890-f8ed38f9f26b',
  },   // id,title
  indicators: {
    data: null,
    requested: null,
    source: 'api',
    path: API_PATH,
    resourceId: '317118dc-be21-46d6-972c-1363512e7faa',
  }, // id,indicator_id,type,question_no,title,description
  insights: {
    data: null,
    requested: null,
    source: 'api',
    path: API_PATH,
    resourceId: 'b1ff7522-a783-45db-b802-bd270d95a889',
  },   // id,survey_id,value,text,indicator_id,outcome_answers
  outcomes: {
    data: null,
    requested: null,
    source: 'api',
    path: API_PATH,
    resourceId: '668680cc-903c-4420-a6a7-60b150cb68c8',
  },   // id,survey_id,subject_id,indicator_id,value,answer,answer_text
}
: {
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
