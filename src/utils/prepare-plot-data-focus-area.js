// utils
import quasiEquals from './quasi-equals';
import preparePlotData from './prepare-plot-data';

/**
  * prepare data for plot
  * @param {object} subject the current subject
  * @param {object} focusArea the current focusArea
  * @param {object} surveys the surveys
  */
const prepareData = (subject, focusArea, surveys) => {
  // get relevant outcomes for current subject
  const outcomes = focusArea
    .get('outcomes')
    .filter((outcome) => quasiEquals(outcome.get('subject_id'), subject.get('subject_id')));
  return preparePlotData(outcomes, surveys, subject.get('subject_id'));
};
export default prepareData;
