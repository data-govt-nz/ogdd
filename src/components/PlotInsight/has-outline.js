// constants
import { ANSWERS } from 'containers/App/constants';
/**
  * 'not stated' answers should have outline
  * @param {string} answer value of answer_text
  * @return {boolean} has outline
  */
const hasOutline = (answer) => answer === ANSWERS[6]; // not stated
export default hasOutline;
