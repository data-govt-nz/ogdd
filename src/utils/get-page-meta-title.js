import getLabel from 'utils/get-label';

/**
  * Get page meta title as a combination of App title and page title
  *
  * @param {string} labelId a label identifier
  * @return {string} the page title
  */
export default function getPageMetaTitle(labelId) {
  return getLabel(labelId)
    ? `${getLabel(labelId)} - ${getLabel('app.title')}: `
    : getLabel('app.title');
}
