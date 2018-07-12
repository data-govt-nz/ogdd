// update location in store
export const LOCATION_UPDATE = 'LOCATION_UPDATE';
// update location in URL
export const NAVIGATE = 'NAVIGATE';

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

const constants = {
  NAVITEMS,
};
export default constants;
