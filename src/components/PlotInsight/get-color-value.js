// constants
import { ANSWERS } from 'containers/App/constants';
/**
  * get color value for answer and focus area
  * yes: full color
  * other: as specified in theme
  * @param {string} answer value of answer_text
  * @param {string} focusAreaID focus area indicator id
  * @param {object} theme global theme
  * @return {string} color value
  */
const getColorValue = (answer, focusAreaID, theme) => {
  if (answer === ANSWERS[0]) { // yes
    return theme.colors[focusAreaID];
  }
  if (typeof theme.colors[answer] === 'string') {
    return theme.colors[answer];
  }
  return theme.colors[answer][focusAreaID];
};
export default getColorValue;
