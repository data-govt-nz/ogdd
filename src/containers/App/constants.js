/**
  * Global application constants, including
  * - redux action identifiers
  * - data sources that require loading
  * - navigation items
  * - indicators
  * - indicator Icons
  * - theme
  * @ignore
  *
  */

// App action identifiers
// update location in store
export const LOCATION_UPDATE = 'action.LOCATION_UPDATE';
// update location in URL
export const NAVIGATE = 'action.NAVIGATE';
// announce occured navigation
export const NAVIGATION_OCCURED = 'action.NAVIGATION_OCCURED';
// load data
export const LOAD_DATA = 'action.LOAD_DATA';
// mark data load started
export const DATA_REQUESTED = 'action.DATA_REQUESTED';
// mark data load completed
export const DATA_LOADED = 'action.DATA_LOADED';
// mark data load failed
export const LOAD_ERROR = 'action.LOAD_ERROR';

// App data sources
// the API path
const API_PATH = 'https://uat.data.govt.nz/api/3/action/datastore_search';
// load data from API (provide resource id) or locally for testing (path)
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

// global values and indicators
// value for default subject "All of Government"
export const DEFAULT_SUBJECT_ID = 'all';
// identifiers for the 6 focus area indicators
export const FOCUSAREA_INDICATOR_IDS = [
  'fa1', 'fa2', 'fa3', 'fa4', 'fa5', 'fa6',
];
// identifiers for the 3 services indicators
export const SERVICES_INDICATOR_ID_MAP = {
  HOW_ID: 'q03',
  STANDARDS_ID: 'q05',
  SERVICES_ID: 'q04',
};
// identifiers for the 3 assets indicators
export const ASSETS_INDICATOR_ID_MAP = {
  ASSETS_ID: 'assets',
  MACHINEREADABLE_ID: 'assets_machinereadable',
  NZGOAL_ID: 'assets_nzgoal',
};
// common answers to survey question indicators
export const ANSWERS = [
  'yes',
  'developing',
  'like_to',
  'not_sure',
  'not_warranted',
  'no',
  'not_stated',
];

// configuration
// header navigation items
export const NAVITEMS = [
  {
    path: '',
    label: 'component.focus-areas.nav',
    activePaths: ['focus-area'],
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
/**
*
* Icons definitions used by Icon component (/components/Icon)
*
* for each icon one or more SVG-paths are required and optionally also the viewport size (defaults to 24px)
* iconName: {
*   size: 24,
*   paths: ['s v g', 'p a t h s'],
* }
*
* when omitting the size, the paths can also be given:
* iconName: {
*   paths: ['s v g', 'p a t h s'],
* }
* can be given as
* iconName: ['s v g', 'p a t h s'],
*
*
*
*/
export const ICONS = {
  fa1: {
    size: 38,
    paths: [
      'M30.05,8.9H16.49L16,7.48A3.31,3.31,0,0,0,12.92,5H6A3.19,3.19,0,0,0,3,8.25V29.72A3.21,3.21,0,0,0,6.05,33H32a3.2,3.2,0,0,0,3-3.25V13.37C35,10.85,32.34,8.9,30.05,8.9ZM33,29.77A1.18,1.18,0,0,1,32,31H6.12A1.19,1.19,0,0,1,5,29.75V8.23A1.18,1.18,0,0,1,6.05,7h6.82A1.32,1.32,0,0,1,14.1,8L15,10.9h15c1.29,0,2.95,1.2,2.95,2.47Z', 'M23.54,18.5H20.73a.56.56,0,0,1-.6-.55A2.56,2.56,0,0,0,17.5,15.5H15.84a3.5,3.5,0,1,0,0,2h1.7a.58.58,0,0,1,.59.55,2.59,2.59,0,0,0,2.54,2.45h2.87v1H21.62A2.57,2.57,0,0,0,19,24a.61.61,0,0,1-.64.55h-2a3.5,3.5,0,1,0,0,2h2A2.59,2.59,0,0,0,21,24.05a.6.6,0,0,1,.64-.55h1.95v2h5v-9h-5Zm-11-.5A1.5,1.5,0,1,1,14,16.5,1.5,1.5,0,0,1,12.5,18Zm.5,9a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,13,27Zm12.54-8.5h1v5h-1Z',
    ],
  },
  fa2: {
    size: 38,
    path: 'M34.75,4.5h-31v22H18.5v2.59l-3.71,3.7a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l2.29-2.3V33.5a1,1,0,0,0,2,0V31.91l2.29,2.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42l-3.71-3.7V26.5H34.75Zm-2,20h-27V6.5h27ZM14.52,22h-3V18h3Zm3.94,0h-3V13h3Zm3.9,0h-3V15h3Zm4,0h-3V11h3Z',
  },
  fa3: {
    size: 38,
    path: 'M33.94,19a3.6,3.6,0,0,0-2.5-1H29.51c0-.11,0-.22,0-.33V9a4.92,4.92,0,0,0-4.87-5H8A5,5,0,0,0,3,9v8.63a5,5,0,0,0,3.17,4.62v3.21a1.78,1.78,0,0,0,.51,1.25,1.74,1.74,0,0,0,1.24.51,1.89,1.89,0,0,0,1.22-.5l4.06-4.06H17v4.87A3.52,3.52,0,0,0,18.06,30a3.58,3.58,0,0,0,2.5,1h7.27l2.55,2.55a1.35,1.35,0,0,0,1,.48,1.29,1.29,0,0,0,.47-.08,1.46,1.46,0,0,0,1-1.39V30.72A3.43,3.43,0,0,0,35,27.49v-6A3.52,3.52,0,0,0,33.94,19ZM12.37,20.62l-4.2,4.21V20.65l-.8-.16A3,3,0,0,1,5,17.59V9A3,3,0,0,1,8,6H24.58V5l.07,1a2.92,2.92,0,0,1,2.9,3v8.7a3,3,0,0,1-3,3ZM33,27.52A1.45,1.45,0,0,1,31.77,29l-.85.13v2.13L28.65,29h-8.1a1.62,1.62,0,0,1-1.09-.43A1.55,1.55,0,0,1,19,27.41V22.62h5.59A4.94,4.94,0,0,0,28.93,20h2.54a1.53,1.53,0,0,1,1.07.43A1.55,1.55,0,0,1,33,21.56Z',
  },
  fa4: {
    size: 38,
    path: 'M19,19.5A6.5,6.5,0,1,0,12.5,13,6.51,6.51,0,0,0,19,19.5Zm0-11A4.5,4.5,0,1,1,14.5,13,4.51,4.51,0,0,1,19,8.5ZM29.5,13A10.5,10.5,0,1,0,12,20.8V34.55l7-3.18,7,3.19V20.8A10.46,10.46,0,0,0,29.5,13Zm-19,0A8.5,8.5,0,1,1,19,21.5,8.51,8.51,0,0,1,10.5,13ZM14,22.23a9.11,9.11,0,0,0,1,.47V31l-1,.45Zm10,9.21-5-2.27-2,.93V23.3a10.2,10.2,0,0,0,2,.2,10.43,10.43,0,0,0,5-1.27Z',
  },
  fa5: {
    size: 38,
    path: 'M20.37,20.46,20,20.3V16.62a2.33,2.33,0,0,1,.71.22,3.74,3.74,0,0,1,.84,1l1.68-1A3.83,3.83,0,0,0,20,14.65V13H18v1.89a4.18,4.18,0,0,0-1.34.77,3.31,3.31,0,0,0-1.18,2.53c0,1.44.85,2.58,2.52,3.34v4.9a2,2,0,0,1-.67-.57,3,3,0,0,1-.5-1.6l-2,.42a5.18,5.18,0,0,0,1.44,2.95,4.2,4.2,0,0,0,1.76.89V30h2V28.59a4.1,4.1,0,0,0,2.22-1.14,3.87,3.87,0,0,0,1.27-3,3.79,3.79,0,0,0-.76-2.36A5.8,5.8,0,0,0,20.37,20.46Zm-2.78-2.19a1.53,1.53,0,0,1,.41-1V19.2A1.28,1.28,0,0,1,17.59,18.27ZM20.79,26a2.31,2.31,0,0,1-.79.52V22.34a2.85,2.85,0,0,1,.37.23,4.07,4.07,0,0,1,.59.51,1.28,1.28,0,0,1,.33.59,2.4,2.4,0,0,1,.09.76A2.12,2.12,0,0,1,20.79,26ZM23.33,5H8V34H30V11.55ZM10,32V7H22.17v5.67H28V32Z',
  },
  fa6: {
    size: 38,
    path: 'M25,4C20,4,16,6.53,16,9.75S20,15.5,25,15.5,34,13,34,9.75,30.05,4,25,4Zm0,9a3,3,0,1,1,3-3A3,3,0,0,1,25,13ZM18,9.75c0-1.33,1.38-2.52,3.39-3.19a5,5,0,0,0-.57,6.17C19.12,12,18,11,18,9.75Zm11.18,3a5,5,0,0,0-.57-6.17c2,.67,3.39,1.86,3.39,3.19S30.88,12,29.18,12.73ZM26.5,10A1.5,1.5,0,1,1,25,8.5,1.5,1.5,0,0,1,26.5,10Zm-.39,7H18.27l-.2-.57A2.45,2.45,0,0,0,15.85,15H12.24A2.27,2.27,0,0,0,10,17.16V18H9.23A2.24,2.24,0,0,0,7,20.16V21H6.12A2.2,2.2,0,0,0,4,23.23V35H22V32h4V29h3V19.78A2.82,2.82,0,0,0,26.11,17ZM20,33H6V23.21c0-.11.08-.21.16-.21H9.52a.43.43,0,0,1,.35.23L10.46,25h8.78a.81.81,0,0,1,.53.21.72.72,0,0,1,.23.56Zm4-3H22V25.69a2.7,2.7,0,0,0-.84-1.92A2.77,2.77,0,0,0,19.22,23H11.91l-.2-.57A2.44,2.44,0,0,0,9.62,21H9v-.78A.23.23,0,0,1,9.23,20h3.61a.44.44,0,0,1,.38.19L13.86,22h9.32a.87.87,0,0,1,.58.23.79.79,0,0,1,.24.55Zm3-3H26V22.78a2.76,2.76,0,0,0-.85-2,2.88,2.88,0,0,0-2-.8H15.27l-.2-.57A2.45,2.45,0,0,0,12.85,18H12v-.78c0-.13.07-.24.23-.22h3.61a.44.44,0,0,1,.38.19L16.86,19h9.32a.81.81,0,0,1,.58.23.79.79,0,0,1,.24.55Z',
  },
  focusAreas: {
    size: 38,
    path: 'M12.07,26.73a10.16,10.16,0,0,1-2.4-6.67A10.55,10.55,0,0,1,12,13.48a10.1,10.1,0,0,1,7.91-3.79H20a10.43,10.43,0,0,1,7.3,3l-1.42,1.42A8.4,8.4,0,0,0,20,11.69a8.23,8.23,0,0,0-6.41,3,8.56,8.56,0,0,0-1.91,5.35,8.23,8.23,0,0,0,1.93,5.37,8.48,8.48,0,0,0,6.41,3h.07a8.05,8.05,0,0,0,3.6-.86,8.45,8.45,0,0,0,4.65-7.53h2a10.43,10.43,0,0,1-5.75,9.3,9.92,9.92,0,0,1-4.5,1.08H20A10.41,10.41,0,0,1,12.07,26.73Zm14.87-20A15.33,15.33,0,0,0,20,5V7a13.29,13.29,0,0,1,6,1.48A12.87,12.87,0,0,1,33,20a13,13,0,0,1-3.81,9.2A12.89,12.89,0,0,1,20,33,13,13,0,0,1,8.28,25.64,12.76,12.76,0,0,1,7,20a13.35,13.35,0,0,1,1.53-6.13l-1.76-.94A15.26,15.26,0,0,0,5,20a14.77,14.77,0,0,0,1.49,6.53A15,15,0,0,0,20,35h.09A15,15,0,0,0,26.94,6.7ZM21.68,23.11a3.76,3.76,0,0,1-2.46.44l-.31,2a5.42,5.42,0,0,0,.89.07,5.91,5.91,0,0,0,2.87-.75,5.57,5.57,0,0,0,2.77-4.08,5.89,5.89,0,0,0-.68-3.68,5.54,5.54,0,0,0-4.19-2.82A5.77,5.77,0,0,0,17,15a5.48,5.48,0,0,0-2.33,2.57,5.84,5.84,0,0,0,.24,5.2l1.74-1a3.87,3.87,0,0,1-.15-3.43A3.42,3.42,0,0,1,18,16.73a3.72,3.72,0,0,1,2.33-.47A3.52,3.52,0,0,1,23,18.06a3.89,3.89,0,0,1,.45,2.44A3.55,3.55,0,0,1,21.68,23.11Z',
  },
  insights: {
    size: 38,
    path: 'M15.65,26.31l-.23,2a10.17,10.17,0,0,1-7.71-5.17,10.86,10.86,0,0,1-1.26-6.82A10.23,10.23,0,0,1,11.58,8.8a10.85,10.85,0,0,1,6.93-1.27l-.3,2a8.81,8.81,0,0,0-5.65,1,8.25,8.25,0,0,0-4.13,6.05,8.91,8.91,0,0,0,1,5.57A8.14,8.14,0,0,0,15.65,26.31ZM35.28,32l-4.73,4.72L24,30.13a14,14,0,1,1,2.4-22.52l3.17-3.05L27.8,9.11a13.91,13.91,0,0,1,1,16.4Zm-9.9-16.52h3.35A12,12,0,0,0,27,11.32ZM29,18a12.19,12.19,0,0,0-.15-1.82L17.11,28.09l3.53-9.7h-5.5L24.91,9A12,12,0,1,0,29,18ZM26.12,29.46,28,27.57l-.43-.44A14.82,14.82,0,0,1,25.65,29Zm4.43,4.43L32.45,32l-3-3-1.89,1.9Z',
  },
  services: {
    size: 38,
    path: 'M27.08,10.53v5.68h-3a1.88,1.88,0,0,1-1.78-2,3.9,3.9,0,0,0-3.73-4H14.92a5,5,0,1,0-.08,2h3.7a1.89,1.89,0,0,1,1.78,2,3.9,3.9,0,0,0,3.72,4h3V20H24.36a3.9,3.9,0,0,0-3.68,4A1.87,1.87,0,0,1,19,26H14.9a5,5,0,1,0,0,2H19a3.9,3.9,0,0,0,3.67-4,1.88,1.88,0,0,1,1.73-2h2.67v5.53h7v-17ZM10,14a3,3,0,1,1,3-3A3,3,0,0,1,10,14Zm0,16a3,3,0,1,1,3-3A3,3,0,0,1,10,30Zm22.08-4.47h-3v-13h3Z',
  },
  assets: {
    size: 38,
    path: 'M34,7H10v4.35H5.65v21h24V28H34Zm-6.35,6.35V15h-20V13.35ZM20,17V30.35H12V17ZM7.65,17H10V30.35H7.65ZM22,30.35V17h5.65V30.35ZM32,26H29.65V11.35H12V9H32Z',
  },
  close: {
    size: 28,
    path: 'M16.18,14.06,28.12,26,26,28.12,14.06,16.18,2.12,28.12,0,26,11.94,14.06,0,2.12,2.12,0,14.06,11.94,26,0l2.12,2.12Z',
  },
  about: {
    size: 38,
    path: 'M33,21a4,4,0,0,0-3.32,1.77l.06-.24-2.8-.7A7.54,7.54,0,0,0,27,21,6,6,0,0,0,25,16.5L29.74,9,30,9a3.92,3.92,0,0,0,.76.08A4,4,0,0,0,34,2.88,4,4,0,1,0,27.4,7.35,3.73,3.73,0,0,0,28,8l-4.73,7.41a6,6,0,0,0-5.09.28l-5.24-7A4,4,0,1,0,10,10a4.11,4.11,0,0,0,1.22-.21L16.59,17A5.94,5.94,0,0,0,15,20.7l-5.34.76a4,4,0,1,0,.26,2l5.29-.76a6,6,0,0,0,3.14,3.7L17.48,30a4.47,4.47,0,0,0-1.13.16A4,4,0,0,0,17.52,38a4,4,0,0,0,1.17-.18,4,4,0,0,0,.74-7.34L20.3,27c.23,0,.46,0,.7,0a6,6,0,0,0,5.33-3.26l2.73.68A3.68,3.68,0,0,0,29,25a4,4,0,1,0,4-4ZM28.75,4.74a2,2,0,0,1,2-1.62,2.43,2.43,0,0,1,.38,0A2,2,0,0,1,32.37,4a1.94,1.94,0,0,1,.3,1.5,2,2,0,1,1-3.92-.76ZM10,8a2,2,0,1,1,2-2A2,2,0,0,1,10,8ZM6,25a2,2,0,1,1,2-2A2,2,0,0,1,6,25Zm13.44,8.41a2,2,0,1,1-2.5-1.33,1.93,1.93,0,0,1,.58-.08A2,2,0,0,1,19.44,33.41ZM21,25a4,4,0,1,1,4-4A4,4,0,0,1,21,25Zm12,2a2,2,0,1,1,2-2A2,2,0,0,1,33,27Z',
  },
};


// theme breakpoints
export const BREAKPOINTS = {
  SMALL: 0,
  MEDIUM: 1,
  LARGE: 2,
};
// theme defining breakpoints, colors, sizes, grid gutters
// breakpoints:
// < 720px (45em): extra-small (mobile)
// > XXXpx (63em): small (tablet portrait)
// >= 1008px (63em): medium (tablet landscape, desktop)
export const THEME = {
  breakpoints: ['45em', '63em', '72em'],
  gutter: ['4px', '6px', '8px'],
  sizes: ['12px', '14px', '18.66px', '28px', '34px'],
  colors: {
    white: '#fff',
    light: '#E7E9EB',
    dark: '#8B969D',
    black: '#202326',
    hover: '#2956D1',
    fa1: '#491C8B',
    fa2: '#AD9300',
    fa3: '#00A2C7',
    fa4: '#199F8B',
    fa5: '#2956D1',
    fa6: '#FC6128',
    not_stated: '#E7E9EB',
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
