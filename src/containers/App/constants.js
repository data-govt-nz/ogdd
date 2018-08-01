import iconFA1 from 'assets/fa1.svg';
import iconFA2 from 'assets/fa2.svg';
import iconFA3 from 'assets/fa3.svg';
import iconFA4 from 'assets/fa4.svg';
import iconFA5 from 'assets/fa5.svg';
import iconFA6 from 'assets/fa6.svg';
import iconFA1dark from 'assets/fa1-dark.svg';
import iconFA2dark from 'assets/fa2-dark.svg';
import iconFA3dark from 'assets/fa3-dark.svg';
import iconFA4dark from 'assets/fa4-dark.svg';
import iconFA5dark from 'assets/fa5-dark.svg';
import iconFA6dark from 'assets/fa6-dark.svg';
import iconFA1white from 'assets/fa1-white.svg';
import iconFA2white from 'assets/fa2-white.svg';
import iconFA3white from 'assets/fa3-white.svg';
import iconFA4white from 'assets/fa4-white.svg';
import iconFA5white from 'assets/fa5-white.svg';
import iconFA6white from 'assets/fa6-white.svg';

// App actions
// update location in store
export const LOCATION_UPDATE = 'action.LOCATION_UPDATE';
// update location in URL
export const NAVIGATE = 'action.NAVIGATE';
export const LOAD_DATA = 'action.LOAD_DATA';
export const DATA_REQUESTED = 'action.DATA_REQUESTED';
export const DATA_LOADED = 'action.DATA_LOADED';
export const LOAD_ERROR = 'action.LOAD_ERROR';

// App data sources
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
    filename: 'subjects30.csv',
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
    filename: 'outcomes30.csv',
  },   // id,survey_id,subject_id,indicator_id,value,answer,answer_text
};
// values
export const DEFAULT_SUBJECT_ID = 'all';
export const FOCUSAREA_INDICATOR_IDS = [
  'fa1', 'fa2', 'fa3', 'fa4', 'fa5', 'fa6',
];
export const SERVICES_INDICATOR_ID_MAP = {
  HOW_ID: 'q03',
  STANDARDS_ID: 'q05',
  SERVICES_ID: 'q04',
};
export const ASSETS_INDICATOR_ID_MAP = {
  ASSETS_ID: 'assets',
  MACHINEREADABLE_ID: 'assets_machinereadable',
  NZGOAL_ID: 'assets_nzgoal',
};
export const ANSWERS = [
  'yes',
  'developing',
  'like_to',
  'not_sure',
  'not_warranted',
  'no',
  'not_stated',
];

// config
// header
export const NAVITEMS = [
  {
    path: '',
    label: 'component.focus-areas.nav',
    activePaths: ['focusarea'],
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

// assets
export const FOCUSAREA_ICONS = {
  fa1: iconFA1,
  fa2: iconFA2,
  fa3: iconFA3,
  fa4: iconFA4,
  fa5: iconFA5,
  fa6: iconFA6,
};
export const FOCUSAREA_DARKICONS = {
  fa1: iconFA1dark,
  fa2: iconFA2dark,
  fa3: iconFA3dark,
  fa4: iconFA4dark,
  fa5: iconFA5dark,
  fa6: iconFA6dark,
};
export const FOCUSAREA_WHITEICONS = {
  fa1: iconFA1white,
  fa2: iconFA2white,
  fa3: iconFA3white,
  fa4: iconFA4white,
  fa5: iconFA5white,
  fa6: iconFA6white,
};

// theme
export const BREAKPOINTS = {
  SMALL: 0,
  MEDIUM: 1,
  LARGE: 2,
};

export const THEME = {
  breakpoints: ['45em', '63em', '72em'],
  gutter: ['4px', '6px', '8px'],
  sizes: ['12px', '14px', '18px', '28px', '34px'],
  colors: {
    white: '#fff',
    light: '#E7E9EB',
    dark: '#8B969D',
    black: '#202326',
    fa1: '#491C8B',
    fa2: '#AD9300',
    fa3: '#00A2C7',
    fa4: '#199F8B',
    fa5: '#2956D1',
    fa6: '#FC6128',
    not_stated: '#fff',
    not_stated_outline: '#E7E9EB',
    no: '#E7E9EB',
    not_warranted: '#E7E9EB',
    not_sure: '#C4CACD',
    like_to: '#C4CACD',
    developing: {
      fa1: '#9176B9',
      fa2: '#CDBE65',
      fa3: '#65C7DD',
      fa4: '#74C5B9',
      fa5: '#7E99E3',
      fa6: '#FDBFA8',
    },
    faPlotBackground: '#F4F5F5',
    faReference: '#D4D7D9',
    assetReference: '#DCDEE0',
    assetReferenceHint: '#68777D',
    referenceLabel: '#4D5E65',
  },
};
