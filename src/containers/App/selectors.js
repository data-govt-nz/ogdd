import { createSelector } from 'reselect';

// const getState = (state) => state;

export const selectLocation = (state) => state.get('location');
export const selectAnnouncement = (state) => state.get('announcement');
export const selectData = (state) => state.get('data');

export const selectRequestedAt = createSelector(
  selectData,
  (state, { key }) => key,
  (data, key) => data.get(key) && data.getIn([key, 'requested'])
);
