import labels from 'text/labels.json';
/**
  * Get label from labels.json text file
  *
  * @param {string} id the label identifier
  * @return {string|null} the label or null if not defined
  *
  * @author [tmfrnz](https://github.com/tmfrnz)
  */
export default function getLabel(id) {
  return labels[id] || null;
}
