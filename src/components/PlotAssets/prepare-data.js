// utils
import quasiEquals from 'utils/quasi-equals';
import preparePlotData from 'utils/prepare-plot-data';
// constants
import { DEFAULT_SUBJECT_ID } from 'containers/App/constants';

/**
  * prepare data for plot
  * @param {object} indicator the indicator
  * @param {object} surveys the surveys
  */
const prepareData = (indicator, surveys) => {
  const outcomes = indicator
    .get('outcomes') // we are showing outcomes
    .filter((outcome) => quasiEquals(outcome.get('subject_id'), DEFAULT_SUBJECT_ID));
    // for the current subject
  return preparePlotData(outcomes, surveys, indicator.get('indicator_id'));
};
export default prepareData;
