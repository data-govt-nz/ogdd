/**
  * Simple function to add 'target="_blank"' attribute to link tags
  *
  * @param {string} html an HTML string
  * @return the modified HTML string
  * @author [tmfrnz](https://github.com/tmfrnz)
  */
export default function setLinkTarget(html) {
  return html.split('<a ').join('<a target="_blank" ');
}
